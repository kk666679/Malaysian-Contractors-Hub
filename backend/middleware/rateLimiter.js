import redisService from '../services/redisService.js';

// Rate limiting middleware using Redis
export const createRateLimiter = (options = {}) => {
  const {
    windowMs = 15 * 60 * 1000, // 15 minutes
    maxRequests = 100,
    message = 'Too many requests, please try again later',
    skipSuccessfulRequests = false,
    skipFailedRequests = false,
    keyGenerator = (req) => req.ip
  } = options;

  return async (req, res, next) => {
    try {
      const key = `rate_limit:${keyGenerator(req)}`;
      const current = await redisService.get(key);
      
      if (current === null) {
        // First request in window
        await redisService.setex(key, Math.ceil(windowMs / 1000), 1);
        req.rateLimit = {
          limit: maxRequests,
          current: 1,
          remaining: maxRequests - 1,
          resetTime: new Date(Date.now() + windowMs)
        };
        return next();
      }

      const currentCount = parseInt(current);
      
      if (currentCount >= maxRequests) {
        const ttl = await redisService.ttl(key);
        const resetTime = new Date(Date.now() + (ttl * 1000));
        
        return res.status(429).json({
          success: false,
          message,
          retryAfter: ttl,
          resetTime
        });
      }

      // Increment counter
      await redisService.incr(key);
      
      req.rateLimit = {
        limit: maxRequests,
        current: currentCount + 1,
        remaining: maxRequests - currentCount - 1,
        resetTime: new Date(Date.now() + windowMs)
      };

      // Add rate limit headers
      res.set({
        'X-RateLimit-Limit': maxRequests,
        'X-RateLimit-Remaining': req.rateLimit.remaining,
        'X-RateLimit-Reset': req.rateLimit.resetTime.toISOString()
      });

      next();
    } catch (error) {
      console.error('Rate limiter error:', error);
      // If Redis is down, allow the request to proceed
      next();
    }
  };
};

// Predefined rate limiters
export const authLimiter = createRateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  maxRequests: 5, // 5 login attempts per 15 minutes
  message: 'Too many authentication attempts, please try again later'
});

export const apiLimiter = createRateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  maxRequests: 100, // 100 requests per 15 minutes
  message: 'Too many API requests, please try again later'
});

export const strictLimiter = createRateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  maxRequests: 10, // 10 requests per 15 minutes
  message: 'Rate limit exceeded for this endpoint'
});

// Advanced rate limiter with different tiers
export const tieredLimiter = (userRole) => {
  const limits = {
    ADMIN: { maxRequests: 1000, windowMs: 15 * 60 * 1000 },
    PROJECT_MANAGER: { maxRequests: 500, windowMs: 15 * 60 * 1000 },
    CONTRACTOR: { maxRequests: 200, windowMs: 15 * 60 * 1000 },
    CLIENT: { maxRequests: 100, windowMs: 15 * 60 * 1000 },
    default: { maxRequests: 50, windowMs: 15 * 60 * 1000 }
  };
  
  const config = limits[userRole] || limits.default;
  return createRateLimiter(config);
};

export default {
  createRateLimiter,
  authLimiter,
  apiLimiter,
  strictLimiter,
  tieredLimiter
};