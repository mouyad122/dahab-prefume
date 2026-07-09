import { Redis } from '@upstash/redis';

let redisClient = null;

export function getRedis() {
  if (redisClient) return redisClient;

  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (url && token) {
    try {
      redisClient = new Redis({ url, token });
    } catch (error) {
      console.error('Failed to initialize Upstash Redis:', error);
      redisClient = null;
    }
  } else if (process.env.NODE_ENV === 'production') {
    console.warn('WARNING: UPSTASH_REDIS_REST_URL / UPSTASH_REDIS_REST_TOKEN not set in production.');
  }

  return redisClient;
}

const inMemoryCache = new Map();

export async function rateLimit(key, limit, windowSeconds) {
  const redis = getRedis();

  if (redis) {
    try {
      const count = await redis.incr(key);
      if (count === 1) {
        await redis.expire(key, windowSeconds);
      }
      return count <= limit;
    } catch (err) {
      console.error('Redis rate limit error, falling back to memory:', err);
      return inMemoryRateLimit(key, limit, windowSeconds);
    }
  }

  return inMemoryRateLimit(key, limit, windowSeconds);
}

function inMemoryRateLimit(key, limit, windowSeconds) {
  const now = Date.now();
  const entry = inMemoryCache.get(key);

  if (!entry || now > entry.expiresAt) {
    inMemoryCache.set(key, { count: 1, expiresAt: now + windowSeconds * 1000 });
    return true;
  }

  entry.count += 1;
  return entry.count <= limit;
}
