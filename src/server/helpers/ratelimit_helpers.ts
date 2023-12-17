import { Ratelimit } from "@upstash/ratelimit";
import fetch from "node-fetch";
import { redis } from "../redis";

type RateLimitTarget =
    | "getInitialTools"
    | "getToolsBySortAndFilter"
    | "getToolsByTag"
    | "getToolByName"
    | "getToolsByQuery"
    | "getToolsByRelation"
    | "loadMoreTools"
    | "getUserFavoriteTools"
    | "loadMoreFavorites";

const COMMON_LIMITER = Ratelimit.slidingWindow(60, "1m");

const ratelimit = {
    getInitialTools: new Ratelimit({
        redis,
        analytics: true,
        prefix: "ratelimit:getInitialTools",
        limiter: COMMON_LIMITER,
    }),
    getToolsBySortAndFilter: new Ratelimit({
        redis,
        analytics: true,
        prefix: "ratelimit:getToolsBySortAndFilter",
        limiter: COMMON_LIMITER,
    }),
    getToolsByTag: new Ratelimit({
        redis,
        analytics: true,
        prefix: "ratelimit:getToolsByTag",
        limiter: COMMON_LIMITER,
    }),
    getToolByName: new Ratelimit({
        redis,
        analytics: true,
        prefix: "ratelimit:getToolByName",
        limiter: COMMON_LIMITER,
    }),
    getToolsByQuery: new Ratelimit({
        redis,
        analytics: true,
        prefix: "ratelimit:getToolsByQuery",
        limiter: COMMON_LIMITER,
    }),
    getToolsByRelation: new Ratelimit({
        redis,
        analytics: true,
        prefix: "ratelimit:getToolsByRelation",
        limiter: COMMON_LIMITER,
    }),
    loadMoreTools: new Ratelimit({
        redis,
        analytics: true,
        prefix: "ratelimit:loadMoreTools",
        limiter: COMMON_LIMITER,
    }),
    getUserFavoriteTools: new Ratelimit({
        redis,
        analytics: true,
        prefix: "ratelimit:getUserFavoriteTools",
        limiter: COMMON_LIMITER,
    }),
    loadMoreFavorites: new Ratelimit({
        redis,
        analytics: true,
        prefix: "ratelimit:loadMoreFavorites",
        limiter: COMMON_LIMITER,
    }),
};

export const doRateLimitCheck = async (target: RateLimitTarget) => {
    try {
        const url =
            process.env.NODE_ENV === "production"
                ? "https://www.aipg.io/api/whois"
                : "http://localhost:3000/api/whois";
        const response = await fetch(url);
        const data = (await response.json()) as { message: string; ip: string };

        const { success } = await ratelimit[target].limit(data.ip);

        return {
            success,
        };
    } catch (error) {
        return {
            message: "Something went wrong checking rate-limit",
            success: false,
        };
    }
};
