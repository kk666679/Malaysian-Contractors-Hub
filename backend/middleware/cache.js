import redisService from '../services/redisService.js';

// Cache middleware for API responses
export const cacheMiddleware = (duration = 300) => {
  return async (req, res, next) => {
    if (req.method !== 'GET') {
      return next();
    }

    const key = `cache:${req.originalUrl}`;
    
    try {
      const cached = await redisService.get(key);
      if (cached) {
        return res.json(JSON.parse(cached));
      }

      const originalSend = res.json;
      res.json = function(data) {
        redisService.setex(key, duration, JSON.stringify(data));
        return originalSend.call(this, data);
      };

      next();
    } catch (error) {
      next();
    }
  };
};

// Cache invalidation helper
export const invalidateCache = async (pattern) => {
  try {
    const keys = await redisService.keys(`cache:${pattern}*`);
    if (keys.length > 0) {
      await redisService.del(...keys);
    }
  } catch (error) {
    console.error('Cache invalidation error:', error);
  }
};