import { getRedis } from './redis';

const CACHE_VERSION = process.env.CACHE_VERSION || 'v1';
const KEY_PREFIX = `dahab:${CACHE_VERSION}:`;

function getClient() {
  return getRedis();
}

export function cacheKey(key) {
  return `${KEY_PREFIX}${key}`;
}

export async function getCache(key) {
  const redis = getClient();
  if (!redis) return null;
  try {
    const data = await redis.get(cacheKey(key));
    if (!data) return null;
    if (typeof data === 'string') {
      try { return JSON.parse(data); } catch { return data; }
    }
    return data;
  } catch (err) {
    console.error(`[cache] getCache error for key "${key}":`, err);
    return null;
  }
}

export async function setCache(key, value, ttlSeconds = 300) {
  const redis = getClient();
  if (!redis) return;
  try {
    const serialized = typeof value === 'object' ? JSON.stringify(value) : value;
    await redis.set(cacheKey(key), serialized, { ex: ttlSeconds });
  } catch (err) {
    console.error(`[cache] setCache error for key "${key}":`, err);
  }
}

export async function deleteCache(key) {
  const redis = getClient();
  if (!redis) return;
  try {
    await redis.del(cacheKey(key));
  } catch (err) {
    console.error(`[cache] deleteCache error for key "${key}":`, err);
  }
}

export async function deleteCachePattern(pattern) {
  const redis = getClient();
  if (!redis) return;
  try {
    const fullPattern = `${KEY_PREFIX}${pattern}`;
    let cursor = 0;
    do {
      const result = await redis.scan(cursor, { match: fullPattern, count: 100 });
      cursor = result[0];
      const keys = result[1];
      if (keys.length > 0) {
        await redis.del(...keys);
      }
    } while (cursor !== 0);
  } catch (err) {
    console.error(`[cache] deleteCachePattern error for pattern "${pattern}":`, err);
  }
}

export async function bustCache() {
  await deleteCachePattern('*');
}

export async function invalidateProduct(slugOrId) {
  if (slugOrId) await deleteCache(`product:${slugOrId}`);
  await deleteCachePattern('products:public*');
  await deleteCache('featured:*');
  await deleteCachePattern('categories:*');
}

export async function invalidateProductList() {
  await deleteCachePattern('products:public*');
}

export async function invalidateFeatured() {
  await deleteCache('featured:*');
}

export async function invalidateFilters() {
  await deleteCache('filters:*');
}

export async function invalidateCategories() {
  await deleteCachePattern('categories:*');
}

export async function invalidateSettings() {
  await deleteCache('settings:*');
}
