import express from 'express';
import redisService from '../services/redisService.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Test Redis connection
router.get('/test', authenticateToken, async (req, res) => {
  try {
    const ping = await redisService.ping();
    res.json({
      success: true,
      message: 'Redis connection successful',
      ping: ping
    });
  } catch (error) {
    console.error('Redis test error:', error);
    res.status(500).json({
      success: false,
      message: 'Redis connection failed',
      error: error.message
    });
  }
});

// Set a key-value pair
router.post('/set', async (req, res) => {
  try {
    const { key, value, ttl } = req.body;

    if (!key || !value) {
      return res.status(400).json({
        success: false,
        message: 'Key and value are required'
      });
    }

    const result = await redisService.set(key, value, ttl);
    res.json({
      success: true,
      message: 'Key set successfully',
      result: result
    });
  } catch (error) {
    console.error('Redis set error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to set key',
      error: error.message
    });
  }
});

// Get a value by key
router.get('/get/:key', async (req, res) => {
  try {
    const { key } = req.params;
    const value = await redisService.get(key);

    if (value === null) {
      return res.status(404).json({
        success: false,
        message: 'Key not found'
      });
    }

    res.json({
      success: true,
      key: key,
      value: value
    });
  } catch (error) {
    console.error('Redis get error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get key',
      error: error.message
    });
  }
});

// Delete a key
router.delete('/del/:key', async (req, res) => {
  try {
    const { key } = req.params;
    const result = await redisService.del(key);

    res.json({
      success: true,
      message: 'Key deleted',
      deleted: result
    });
  } catch (error) {
    console.error('Redis delete error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete key',
      error: error.message
    });
  }
});

// Check if key exists
router.get('/exists/:key', async (req, res) => {
  try {
    const { key } = req.params;
    const exists = await redisService.exists(key);

    res.json({
      success: true,
      key: key,
      exists: exists === 1
    });
  } catch (error) {
    console.error('Redis exists error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to check key existence',
      error: error.message
    });
  }
});

// Set expiration time for a key
router.post('/expire', async (req, res) => {
  try {
    const { key, ttl } = req.body;

    if (!key || !ttl) {
      return res.status(400).json({
        success: false,
        message: 'Key and TTL are required'
      });
    }

    const result = await redisService.expire(key, ttl);
    res.json({
      success: true,
      message: 'Expiration set successfully',
      result: result
    });
  } catch (error) {
    console.error('Redis expire error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to set expiration',
      error: error.message
    });
  }
});

// Get TTL for a key
router.get('/ttl/:key', async (req, res) => {
  try {
    const { key } = req.params;
    const ttl = await redisService.ttl(key);

    res.json({
      success: true,
      key: key,
      ttl: ttl
    });
  } catch (error) {
    console.error('Redis TTL error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get TTL',
      error: error.message
    });
  }
});

router.get('/keys/:pattern', async (req, res) => {
  try {
    const pattern = req.params.pattern || '*';
    const keys = await redisService.keys(pattern);

    res.json({
      success: true,
      pattern: pattern,
      keys: keys,
      count: keys.length
    });
  } catch (error) {
    console.error('Redis keys error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get keys',
      error: error.message
    });
  }
});

// Hash operations
router.post('/hset', async (req, res) => {
  try {
    const { hash, field, value } = req.body;

    if (!hash || !field || !value) {
      return res.status(400).json({
        success: false,
        message: 'Hash, field, and value are required'
      });
    }

    const result = await redisService.hset(hash, field, value);
    res.json({
      success: true,
      message: 'Hash field set successfully',
      result: result
    });
  } catch (error) {
    console.error('Redis hset error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to set hash field',
      error: error.message
    });
  }
});

router.get('/hget/:hash/:field', async (req, res) => {
  try {
    const { hash, field } = req.params;
    const value = await redisService.hget(hash, field);

    if (value === null) {
      return res.status(404).json({
        success: false,
        message: 'Hash field not found'
      });
    }

    res.json({
      success: true,
      hash: hash,
      field: field,
      value: value
    });
  } catch (error) {
    console.error('Redis hget error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get hash field',
      error: error.message
    });
  }
});

router.get('/hgetall/:hash', async (req, res) => {
  try {
    const { hash } = req.params;
    const hashData = await redisService.hgetall(hash);

    res.json({
      success: true,
      hash: hash,
      data: hashData
    });
  } catch (error) {
    console.error('Redis hgetall error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get hash data',
      error: error.message
    });
  }
});

// List operations
router.post('/lpush', async (req, res) => {
  try {
    const { key, values } = req.body;

    if (!key || !Array.isArray(values)) {
      return res.status(400).json({
        success: false,
        message: 'Key and values array are required'
      });
    }

    const result = await redisService.lpush(key, ...values);
    res.json({
      success: true,
      message: 'Values pushed to list successfully',
      result: result
    });
  } catch (error) {
    console.error('Redis lpush error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to push to list',
      error: error.message
    });
  }
});

router.get('/lrange/:key/:start/:end', async (req, res) => {
  try {
    const { key, start, end } = req.params;
    const values = await redisService.lrange(key, parseInt(start), parseInt(end));

    res.json({
      success: true,
      key: key,
      range: { start: parseInt(start), end: parseInt(end) },
      values: values
    });
  } catch (error) {
    console.error('Redis lrange error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get list range',
      error: error.message
    });
  }
});

// Set operations
router.post('/sadd', async (req, res) => {
  try {
    const { key, members } = req.body;

    if (!key || !Array.isArray(members)) {
      return res.status(400).json({
        success: false,
        message: 'Key and members array are required'
      });
    }

    const result = await redisService.sadd(key, ...members);
    res.json({
      success: true,
      message: 'Members added to set successfully',
      result: result
    });
  } catch (error) {
    console.error('Redis sadd error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to add to set',
      error: error.message
    });
  }
});

router.get('/smembers/:key', async (req, res) => {
  try {
    const { key } = req.params;
    const members = await redisService.smembers(key);

    res.json({
      success: true,
      key: key,
      members: members
    });
  } catch (error) {
    console.error('Redis smembers error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get set members',
      error: error.message
    });
  }
});

// Sorted set operations
router.post('/zadd', async (req, res) => {
  try {
    const { key, score, member } = req.body;

    if (!key || score === undefined || !member) {
      return res.status(400).json({
        success: false,
        message: 'Key, score, and member are required'
      });
    }

    const result = await redisService.zadd(key, parseFloat(score), member);
    res.json({
      success: true,
      message: 'Member added to sorted set successfully',
      result: result
    });
  } catch (error) {
    console.error('Redis zadd error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to add to sorted set',
      error: error.message
    });
  }
});

router.get('/zrange/:key/:start/:end', async (req, res) => {
  try {
    const { key, start, end } = req.params;
    const withScores = req.query.withScores === 'true';
    const members = await redisService.zrange(key, parseInt(start), parseInt(end), withScores);

    res.json({
      success: true,
      key: key,
      range: { start: parseInt(start), end: parseInt(end) },
      withScores: withScores,
      members: members
    });
  } catch (error) {
    console.error('Redis zrange error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get sorted set range',
      error: error.message
    });
  }
});

// Counter operations
router.post('/incr/:key', async (req, res) => {
  try {
    const { key } = req.params;
    const result = await redisService.incr(key);

    res.json({
      success: true,
      key: key,
      newValue: result
    });
  } catch (error) {
    console.error('Redis incr error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to increment counter',
      error: error.message
    });
  }
});

router.post('/decr/:key', async (req, res) => {
  try {
    const { key } = req.params;
    const result = await redisService.decr(key);

    res.json({
      success: true,
      key: key,
      newValue: result
    });
  } catch (error) {
    console.error('Redis decr error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to decrement counter',
      error: error.message
    });
  }
});

// Get Redis info
router.get('/info', async (req, res) => {
  try {
    const info = await redisService.info();
    res.json({
      success: true,
      info: info
    });
  } catch (error) {
    console.error('Redis info error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get Redis info',
      error: error.message
    });
  }
});

// Flush all data (use with caution)
router.post('/flushall', authenticateToken, async (req, res) => {
  try {
    const result = await redisService.flushall();
    res.json({
      success: true,
      message: 'All Redis data flushed',
      result: result
    });
  } catch (error) {
    console.error('Redis flushall error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to flush Redis data',
      error: error.message
    });
  }
});

export default router;
