import { createClient } from 'redis';

class RedisService {
  constructor() {
    this.client = null;
    this.isConnected = false;
  }

  async connect() {
    try {
      this.client = createClient({
        username: 'default',
        password: 'ujWFD8JDVUuKKPPsXtQ5smVLSAwOkLuc',
        socket: {
          host: 'redis-19725.c62.us-east-1-4.ec2.redns.redis-cloud.com',
          port: 19725
        }
      });

      this.client.on('error', (err) => {
        console.error('Redis Client Error:', err);
        this.isConnected = false;
      });

      this.client.on('connect', () => {
        console.log('Connected to Redis');
        this.isConnected = true;
      });

      this.client.on('disconnect', () => {
        console.log('Disconnected from Redis');
        this.isConnected = false;
      });

      await this.client.connect();
      return true;
    } catch (error) {
      console.error('Failed to connect to Redis:', error);
      return false;
    }
  }

  async disconnect() {
    if (this.client && this.isConnected) {
      await this.client.disconnect();
    }
  }

  async get(key) {
    try {
      if (!this.isConnected) {
        await this.connect();
      }
      return await this.client.get(key);
    } catch (error) {
      console.error('Redis GET error:', error);
      return null;
    }
  }

  async set(key, value, ttl = null) {
    try {
      if (!this.isConnected) {
        await this.connect();
      }
      if (ttl) {
        return await this.client.setEx(key, ttl, value);
      }
      return await this.client.set(key, value);
    } catch (error) {
      console.error('Redis SET error:', error);
      return null;
    }
  }

  async del(key) {
    try {
      if (!this.isConnected) {
        await this.connect();
      }
      return await this.client.del(key);
    } catch (error) {
      console.error('Redis DEL error:', error);
      return 0;
    }
  }

  async exists(key) {
    try {
      if (!this.isConnected) {
        await this.connect();
      }
      return await this.client.exists(key);
    } catch (error) {
      console.error('Redis EXISTS error:', error);
      return 0;
    }
  }

  async expire(key, ttl) {
    try {
      if (!this.isConnected) {
        await this.connect();
      }
      return await this.client.expire(key, ttl);
    } catch (error) {
      console.error('Redis EXPIRE error:', error);
      return 0;
    }
  }

  async ttl(key) {
    try {
      if (!this.isConnected) {
        await this.connect();
      }
      return await this.client.ttl(key);
    } catch (error) {
      console.error('Redis TTL error:', error);
      return -2;
    }
  }

  async keys(pattern = '*') {
    try {
      if (!this.isConnected) {
        await this.connect();
      }
      return await this.client.keys(pattern);
    } catch (error) {
      console.error('Redis KEYS error:', error);
      return [];
    }
  }

  async hget(hash, field) {
    try {
      if (!this.isConnected) {
        await this.connect();
      }
      return await this.client.hGet(hash, field);
    } catch (error) {
      console.error('Redis HGET error:', error);
      return null;
    }
  }

  async hset(hash, field, value) {
    try {
      if (!this.isConnected) {
        await this.connect();
      }
      return await this.client.hSet(hash, field, value);
    } catch (error) {
      console.error('Redis HSET error:', error);
      return 0;
    }
  }

  async hgetall(hash) {
    try {
      if (!this.isConnected) {
        await this.connect();
      }
      return await this.client.hGetAll(hash);
    } catch (error) {
      console.error('Redis HGETALL error:', error);
      return {};
    }
  }

  async hdel(hash, field) {
    try {
      if (!this.isConnected) {
        await this.connect();
      }
      return await this.client.hDel(hash, field);
    } catch (error) {
      console.error('Redis HDEL error:', error);
      return 0;
    }
  }

  async lpush(key, ...values) {
    try {
      if (!this.isConnected) {
        await this.connect();
      }
      return await this.client.lPush(key, values);
    } catch (error) {
      console.error('Redis LPUSH error:', error);
      return 0;
    }
  }

  async rpush(key, ...values) {
    try {
      if (!this.isConnected) {
        await this.connect();
      }
      return await this.client.rPush(key, values);
    } catch (error) {
      console.error('Redis RPUSH error:', error);
      return 0;
    }
  }

  async lpop(key) {
    try {
      if (!this.isConnected) {
        await this.connect();
      }
      return await this.client.lPop(key);
    } catch (error) {
      console.error('Redis LPOP error:', error);
      return null;
    }
  }

  async rpop(key) {
    try {
      if (!this.isConnected) {
        await this.connect();
      }
      return await this.client.rPop(key);
    } catch (error) {
      console.error('Redis RPOP error:', error);
      return null;
    }
  }

  async lrange(key, start, end) {
    try {
      if (!this.isConnected) {
        await this.connect();
      }
      return await this.client.lRange(key, start, end);
    } catch (error) {
      console.error('Redis LRANGE error:', error);
      return [];
    }
  }

  async llen(key) {
    try {
      if (!this.isConnected) {
        await this.connect();
      }
      return await this.client.lLen(key);
    } catch (error) {
      console.error('Redis LLEN error:', error);
      return 0;
    }
  }

  async sadd(key, ...members) {
    try {
      if (!this.isConnected) {
        await this.connect();
      }
      return await this.client.sAdd(key, members);
    } catch (error) {
      console.error('Redis SADD error:', error);
      return 0;
    }
  }

  async srem(key, ...members) {
    try {
      if (!this.isConnected) {
        await this.connect();
      }
      return await this.client.sRem(key, members);
    } catch (error) {
      console.error('Redis SREM error:', error);
      return 0;
    }
  }

  async smembers(key) {
    try {
      if (!this.isConnected) {
        await this.connect();
      }
      return await this.client.sMembers(key);
    } catch (error) {
      console.error('Redis SMEMBERS error:', error);
      return [];
    }
  }

  async sismember(key, member) {
    try {
      if (!this.isConnected) {
        await this.connect();
      }
      return await this.client.sIsMember(key, member);
    } catch (error) {
      console.error('Redis SISMEMBER error:', error);
      return 0;
    }
  }

  async scard(key) {
    try {
      if (!this.isConnected) {
        await this.connect();
      }
      return await this.client.sCard(key);
    } catch (error) {
      console.error('Redis SCARD error:', error);
      return 0;
    }
  }

  async zadd(key, score, member) {
    try {
      if (!this.isConnected) {
        await this.connect();
      }
      return await this.client.zAdd(key, { score, value: member });
    } catch (error) {
      console.error('Redis ZADD error:', error);
      return 0;
    }
  }

  async zrange(key, start, end, withScores = false) {
    try {
      if (!this.isConnected) {
        await this.connect();
      }
      return await this.client.zRange(key, start, end, { withScores });
    } catch (error) {
      console.error('Redis ZRANGE error:', error);
      return [];
    }
  }

  async zrem(key, member) {
    try {
      if (!this.isConnected) {
        await this.connect();
      }
      return await this.client.zRem(key, member);
    } catch (error) {
      console.error('Redis ZREM error:', error);
      return 0;
    }
  }

  async zscore(key, member) {
    try {
      if (!this.isConnected) {
        await this.connect();
      }
      return await this.client.zScore(key, member);
    } catch (error) {
      console.error('Redis ZSCORE error:', error);
      return null;
    }
  }

  async zcard(key) {
    try {
      if (!this.isConnected) {
        await this.connect();
      }
      return await this.client.zCard(key);
    } catch (error) {
      console.error('Redis ZCARD error:', error);
      return 0;
    }
  }

  async incr(key) {
    try {
      if (!this.isConnected) {
        await this.connect();
      }
      return await this.client.incr(key);
    } catch (error) {
      console.error('Redis INCR error:', error);
      return null;
    }
  }

  async decr(key) {
    try {
      if (!this.isConnected) {
        await this.connect();
      }
      return await this.client.decr(key);
    } catch (error) {
      console.error('Redis DECR error:', error);
      return null;
    }
  }

  async incrby(key, increment) {
    try {
      if (!this.isConnected) {
        await this.connect();
      }
      return await this.client.incrBy(key, increment);
    } catch (error) {
      console.error('Redis INCRBY error:', error);
      return null;
    }
  }

  async decrby(key, decrement) {
    try {
      if (!this.isConnected) {
        await this.connect();
      }
      return await this.client.decrBy(key, decrement);
    } catch (error) {
      console.error('Redis DECRBY error:', error);
      return null;
    }
  }

  async mget(keys) {
    try {
      if (!this.isConnected) {
        await this.connect();
      }
      return await this.client.mGet(keys);
    } catch (error) {
      console.error('Redis MGET error:', error);
      return [];
    }
  }

  async mset(keyValuePairs) {
    try {
      if (!this.isConnected) {
        await this.connect();
      }
      return await this.client.mSet(keyValuePairs);
    } catch (error) {
      console.error('Redis MSET error:', error);
      return null;
    }
  }

  async flushall() {
    try {
      if (!this.isConnected) {
        await this.connect();
      }
      return await this.client.flushAll();
    } catch (error) {
      console.error('Redis FLUSHALL error:', error);
      return null;
    }
  }

  async ping() {
    try {
      if (!this.isConnected) {
        await this.connect();
      }
      return await this.client.ping();
    } catch (error) {
      console.error('Redis PING error:', error);
      return null;
    }
  }

  async info() {
    try {
      if (!this.isConnected) {
        await this.connect();
      }
      return await this.client.info();
    } catch (error) {
      console.error('Redis INFO error:', error);
      return null;
    }
  }
}

// Create singleton instance
const redisService = new RedisService();

export default redisService;
