import express from 'express';
import { createClient } from 'redis';

const router = express.Router();

const redis = createClient({
  url: process.env.REDIS_URL,
});

redis.on('error', (err) => console.log('Redis Client Error', err));

(async () => {
  await redis.connect();
})();

router.get('/test', async (req, res) => {
  try {
    const value = await redis.get('myKey');
    res.json({ value });
  } catch (error) {
    console.error('Redis GET error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
