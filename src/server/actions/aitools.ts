"use server";

import { AiToolWithRelations } from "@/types";
import { ITEMS_PER_PAGE } from "@/constants";
import { Prisma } from "@prisma/client";
import { aiToolInclusion } from "@/utils/prismaHelper";
import { convertUserQueryToTags } from "./openai";
import { db } from "../db";
import { redis } from "../redis";
import { setNextCursor } from "@/lib/helpers";
import {
    buildAiToolOrderByClause,
    buildWhereClauseForTag,
    combineWhereClauses,
    type SearchParams,
} from "../helpers/aitools_actions_helpers";
import { doRateLimitCheck } from "../helpers/ratelimit_helpers";

type Params = SearchParams;
type ToolsFetchReturnType = {
    aiTools: AiToolWithRelations[];
    nextCursor: string;
    success: boolean;
    totalCount: number;
};
type ToolFetchReturnType = {
    aiTool: AiToolWithRelations;
    success: boolean;
};

const GET_DEFAULT_TOOLS_KEY = "defaultTools";
const GET_TOOLS_BY_SORT_AND_FILTER_KEY = "sortAndFilteredTools";
const GET_TOOLS_BY_TAG_KEY = "toolsByTag";
const GET_TOOLS_BY_RELATION_KEY = "toolsByRelation";
const GET_TOOL_BY_NAME = "toolByName";

export const getInitialTools = async () => {
    try {
        const { success } = await doRateLimitCheck("getInitialTools");

        if (!success) {
            return {
                errored: true,
                message: "Too many requests.",
                success,
            };
        }

        const cachedData = (await redis.json.get(
            GET_DEFAULT_TOOLS_KEY,
        )) as ToolsFetchReturnType | null;

        if (cachedData) {
            console.log("getInitialTools cache response");
            const { aiTools, nextCursor, success, totalCount } = cachedData;

            return {
                aiTools,
                nextCursor,
                success,
                totalCount,
            };
        }

        const aiTools = await db.aiTool.findMany({
            include: aiToolInclusion,
            orderBy: {
                createdAt: "desc",
            },
            take: ITEMS_PER_PAGE,
        });
        const totalCount = await db.aiTool.count();
        const nextCursor = setNextCursor(aiTools);

        const dataToCache = {
            aiTools,
            nextCursor,
            success: true,
            totalCount,
        };

        await redis.json.set(GET_DEFAULT_TOOLS_KEY, "$", dataToCache);
        await redis.expire(GET_DEFAULT_TOOLS_KEY, 3600);

        return {
            aiTools,
            nextCursor,
            success: true,
            totalCount,
        };
    } catch (error) {
        return {
            error,
            success: false,
        };
    }
};

export const loadMoreTools = async (
    cursor: string,
    searchParams: SearchParams = {},
    params: Params,
    generatedTags?: string[],
    relationalTags?: string[],
) => {
    try {
        const { success } = await doRateLimitCheck("loadMoreTools");

        if (!success) {
            return {
                errored: true,
                message: "Too many requests.",
                success,
            };
        }

        let where = {};
        let orderBy: Prisma.AiToolOrderByWithRelationInput = {
            createdAt: "desc",
        };

        const tag = params["tag"];

        if (tag !== "undefined") {
            where = buildWhereClauseForTag(params["tag"]);
        }

        if (searchParams["price_range"]) {
            where = combineWhereClauses(searchParams);
            orderBy = buildAiToolOrderByClause(searchParams);
        }

        if (
            generatedTags &&
            generatedTags.length > 0 &&
            (searchParams["query"] || params["name"])
        ) {
            where = {
                Tags: {
                    some: {
                        tagName: {
                            in: generatedTags,
                        },
                    },
                },
            };
        }

        if (relationalTags && relationalTags.length > 0) {
            where = {
                Tags: {
                    some: {
                        tagName: {
                            in: relationalTags,
                        },
                    },
                },
            };
        }

        const aiToolsPlusOne = await db.aiTool.findMany({
            take: ITEMS_PER_PAGE + 1,
            skip: 1,
            cursor: { id: cursor },
            include: aiToolInclusion,
            orderBy,
            where,
        });

        const hasMoreItems = aiToolsPlusOne.length > ITEMS_PER_PAGE;
        const aiTools = aiToolsPlusOne.slice(0, ITEMS_PER_PAGE);

        const nextCursor = setNextCursor(aiTools, hasMoreItems);

        return {
            aiTools,
            nextCursor,
            success: true,
        };
    } catch (error) {
        return {
            message: "An error occurred while loading tools. Try again later.",
            success: false,
        };
    }
};

export const getToolsBySortAndFilter = async (searchParams: SearchParams) => {
    try {
        const { success } = await doRateLimitCheck("getToolsBySortAndFilter");

        if (!success) {
            return {
                errored: true,
                message: "Too many requests.",
                success,
            };
        }

        const cacheKey = `${GET_TOOLS_BY_SORT_AND_FILTER_KEY}:${JSON.stringify(
            searchParams,
        )}`;
        const cachedData = (await redis.json.get(
            cacheKey,
        )) as ToolsFetchReturnType | null;

        if (cachedData) {
            console.log("getToolsBySortAndFilter cache response");
            const { aiTools, nextCursor, success, totalCount } = cachedData;

            return {
                aiTools,
                nextCursor,
                success,
                totalCount,
            };
        }

        const combinedWhereClauses = combineWhereClauses(searchParams);
        const orderByClauseForAiTool = buildAiToolOrderByClause(searchParams);

        const aiTools = await db.aiTool.findMany({
            where: combinedWhereClauses,
            orderBy: orderByClauseForAiTool,
            include: aiToolInclusion,
            take: ITEMS_PER_PAGE,
        });

        const totalCount = await db.aiTool.count({
            where: combinedWhereClauses,
        });

        const nextCursor = setNextCursor(aiTools);

        const dataToCache = {
            aiTools,
            nextCursor,
            success: true,
            totalCount,
        };

        await redis.json.set(cacheKey, "$", dataToCache);
        await redis.expire(cacheKey, 86400);

        return {
            aiTools,
            nextCursor,
            success: true,
            totalCount,
        };
    } catch (error) {
        return {
            error,
            success: false,
        };
    }
};

export const getToolsByTag = async (tag: string) => {
    try {
        const { success } = await doRateLimitCheck("getToolsByTag");

        if (!success) {
            return {
                errored: true,
                message: "Too many requests.",
                success,
            };
        }

        const cacheKey = `${GET_TOOLS_BY_TAG_KEY}:${tag}`;
        const cachedData = (await redis.json.get(
            cacheKey,
        )) as ToolsFetchReturnType | null;

        if (cachedData) {
            console.log("getToolsByTag cache response");
            const { aiTools, nextCursor, success, totalCount } = cachedData;

            return {
                aiTools,
                nextCursor,
                success,
                totalCount,
            };
        }

        const where = {
            Tags: {
                some: {
                    tagName: {
                        equals: tag,
                    },
                },
            },
        };

        const aiTools = await db.aiTool.findMany({
            where,
            orderBy: {
                createdAt: "desc",
            },
            include: aiToolInclusion,
            take: ITEMS_PER_PAGE,
        });

        const totalCount = await db.aiTool.count({
            where,
        });

        const nextCursor = setNextCursor(aiTools);

        const dataToCache = {
            aiTools,
            nextCursor,
            success: true,
            totalCount,
        };

        await redis.json.set(cacheKey, "$", dataToCache);
        await redis.expire(cacheKey, 86400);

        return {
            aiTools,
            totalCount,
            nextCursor,
            success: true,
        };
    } catch (error) {
        return {
            error,
            success: false,
        };
    }
};

export const getToolByName = async (name: string) => {
    try {
        const { success } = await doRateLimitCheck("getToolByName");

        if (!success) {
            return {
                errored: true,
                message: "Too many requests.",
                success,
            };
        }

        const cacheKey = `${GET_TOOL_BY_NAME}:${name}`;
        const cachedData = (await redis.json.get(
            cacheKey,
        )) as ToolFetchReturnType | null;

        if (cachedData) {
            console.log("getToolsByRelation cache response");
            const { aiTool, success } = cachedData;

            return {
                aiTool,
                success,
            };
        }

        const aiTool = await db.aiTool.findFirst({
            where: {
                nameLowercase: name.toLocaleLowerCase(),
            },
            include: aiToolInclusion,
        });

        const dataToCache = {
            aiTool,
            success: true,
        };

        await redis.json.set(cacheKey, "$", dataToCache);
        await redis.expire(cacheKey, 86400);

        return {
            aiTool,
            success: true,
        };
    } catch (error) {
        return {
            error,
            success: false,
        };
    }
};

export const getToolsByQuery = async (userQuery: string) => {
    try {
        const { success } = await doRateLimitCheck("getToolsByQuery");

        if (!success) {
            return {
                errored: true,
                message: "Too many requests.",
                success,
            };
        }

        const {
            message,
            success: conversionSuccess,
            tags: generatedTags,
        } = await convertUserQueryToTags(userQuery);

        const where = {
            Tags: {
                some: {
                    tagName: {
                        in: generatedTags,
                    },
                },
            },
        };

        if (conversionSuccess) {
            const aiTools = await db.aiTool.findMany({
                where,
                orderBy: {
                    createdAt: "desc",
                },
                include: aiToolInclusion,
                take: ITEMS_PER_PAGE,
            });

            const totalCount = await db.aiTool.count({
                where,
            });

            const nextCursor = setNextCursor(aiTools);

            return {
                aiTools,
                tags: generatedTags,
                totalCount,
                nextCursor,
                success: true,
            };
        }

        return {
            message,
            success: false,
        };
    } catch (error: any) {
        return {
            message: error.message,
            success: false,
        };
    }
};

export const getToolsByRelation = async (tags: string[]) => {
    try {
        const { success } = await doRateLimitCheck("getToolsByRelation");

        if (!success) {
            return {
                errored: true,
                message: "Too many requests.",
                success,
            };
        }

        const cacheKey = `${GET_TOOLS_BY_RELATION_KEY}:${JSON.stringify(tags)}`;
        const cachedData = (await redis.json.get(cacheKey)) as Omit<
            ToolsFetchReturnType,
            "totalCount"
        > | null;

        if (cachedData) {
            console.log("getToolsByRelation cache response");
            const { aiTools, nextCursor, success } = cachedData;

            return {
                aiTools,
                nextCursor,
                success,
            };
        }

        const where = {
            Tags: {
                some: {
                    tagName: {
                        in: tags,
                    },
                },
            },
        };

        const aiTools = await db.aiTool.findMany({
            where,
            orderBy: {
                createdAt: "desc",
            },
            include: aiToolInclusion,
            take: ITEMS_PER_PAGE,
        });

        const nextCursor = setNextCursor(aiTools);

        const dataToCache = {
            aiTools,
            nextCursor,
            success: true,
        };

        await redis.json.set(cacheKey, "$", dataToCache);
        await redis.expire(cacheKey, 86400);

        return {
            aiTools,
            nextCursor,
            success: true,
        };
    } catch (error: any) {
        return {
            message: error.message,
            success: false,
        };
    }
};
