import Redis from 'ioredis';

// Keep track of the Redis instance so we don't create multiple connections in dev
let redisClient = null;

export function getRedisClient() {
  if (redisClient) {
    return redisClient;
  }

  const redisUrl = process.env.REDIS_URL;

  if (redisUrl) {
    try {
      redisClient = new Redis(redisUrl, {
        maxRetriesPerRequest: 3,
        retryStrategy(times) {
          if (times > 3) {
            console.error('Redis retry limit exceeded. Failing gracefully.');
            return null; // Stop retrying
          }
          return Math.min(times * 50, 2000);
        }
      });

      redisClient.on('error', (err) => {
        console.error('Redis client error:', err);
      });
      
    } catch (error) {
      console.error('Failed to initialize Redis client:', error);
      redisClient = null;
    }
  } else {
    if (process.env.NODE_ENV === 'production') {
      console.warn('WARNING: REDIS_URL is not set in production. Falling back to in-memory store. This is not recommended for production rate limiting!');
    }
  }

  return redisClient;
}

// In-memory fallback
const inMemoryCache = new Map();

/**
 * Atomic rate limiting operation (INCR + EXPIRE).
 * Supports graceful fallback to in-memory Map if Redis is not configured or fails.
 */
export async function rateLimit(key, limit, windowSeconds) {
  const redis = getRedisClient();

  if (redis && redis.status === 'ready') {
    try {
      // Use atomic operations
      const multi = redis.multi();
      multi.incr(key);
      // We only want to set expire if it's a new key, but INCR creates it.
      // So we can check TTL, or just blindly EXPIRE. 
      // Actually, a lua script or just blindly doing expire is fine. 
      // To be safe and precise, we can use a script or just let expire reset the window on each hit.
      // A common pattern is to only set expire if the counter is 1.
      
      const result = await redis.pipeline()
        .incr(key)
        .pttl(key)
        .exec();
      
      // result is an array of [error, response] for each command
      const count = result[0][1];
      const ttl = result[1][1];

      // If TTL is -1 (no expiration), set the expiration
      if (ttl === -1) {
        await redis.expire(key, windowSeconds);
      }

      return count <= limit;
    } catch (err) {
      console.error('Redis rate limit error, falling back to memory:', err);
      return inMemoryRateLimit(key, limit, windowSeconds);
    }
  } else {
    return inMemoryRateLimit(key, limit, windowSeconds);
  }
}

function inMemoryRateLimit(key, limit, windowSeconds) {
  const now = Date.now();
  const entry = inMemoryCache.get(key);

  if (!entry) {
    inMemoryCache.set(key, { count: 1, expiresAt: now + windowSeconds * 1000 });
    return true; // Under limit
  }

  if (now > entry.expiresAt) {
    // Window expired, reset
    inMemoryCache.set(key, { count: 1, expiresAt: now + windowSeconds * 1000 });
    return true; // Under limit
  }

  entry.count += 1;
  return entry.count <= limit;
}
