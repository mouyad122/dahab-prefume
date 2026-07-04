import { LangCache } from "@redis-ai/langcache";

// Initialize the LangCache instance using the provided credentials
export const langCache = new LangCache({
  serverURL: "https://aws-us-east-1.langcache.redis.io",
  cacheId: "7d069f25477c494a9a91a4ee31b46fa3",
  apiKey: process.env.LANGCACHE_API_KEY || "lc1_eRkSsT1r0acDahM5YokGgI9FA_vGmYEd-dx-PSkVTZXRGrgV2EDRfioAqAEmnKv5W6qqO0WulM0RpMpKhPqHre9RE6TzbBO4ntqqpt3BkCJr9OF2AuwtXygwngDygeb1vsG9Lq7Fk-Q2VcADkA==",
});

export default langCache;
