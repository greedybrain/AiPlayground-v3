import { Redis } from "@upstash/redis";

// Type-cast the globalThis object to have a 'redis' property for TypeScript awareness.
const globalForRedis = globalThis as unknown as {
    redis: Redis | undefined;
};

// Export a singleton instance of Redis for database operations.
export const redis =
    // Check if an instance of Redis already exists in the global scope
    // and reuse it if available; otherwise, create a new instance.
    globalForRedis.redis ??
    new Redis({
        url: process.env.UPSTASH_REDIS_REST_URL ?? "",
        token: process.env.UPSTASH_REDIS_REST_TOKEN ?? "",
    });

// In non-production environments, assign the Redis instance to the global scope
// to ensure the same instance is reused across the application.
if (process.env.NODE_ENV !== "production") globalForRedis.redis = redis;
