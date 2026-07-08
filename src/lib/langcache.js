import 'server-only';
import { LangCache } from "@redis-ai/langcache";

const { LANGCACHE_SERVER_URL, LANGCACHE_CACHE_ID, LANGCACHE_API_KEY } = process.env;

if (process.env.NODE_ENV === 'production' && (!LANGCACHE_SERVER_URL || !LANGCACHE_CACHE_ID || !LANGCACHE_API_KEY)) {
  throw new Error('LangCache is not configured. Set LANGCACHE_SERVER_URL, LANGCACHE_CACHE_ID, and LANGCACHE_API_KEY.');
}

// Server-only client. Never expose LANGCACHE_API_KEY to browser code.
export const langCache = new LangCache({
  serverURL: LANGCACHE_SERVER_URL,
  cacheId: LANGCACHE_CACHE_ID,
  apiKey: LANGCACHE_API_KEY,
});

export default langCache;
