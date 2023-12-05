"use server";

import { ITEMS_PER_PAGE } from "@/constants";
import { Prisma } from "@prisma/client";
import { aiToolInclusion } from "@/utils/prismaHelper";
import { convertUserQueryToTags } from "./openai";
import { db } from "../db";
import { setNextCursor } from "@/lib/helpers";

type SearhParams = Record<string, string>;
type Params = SearhParams;

export const getInitialTools = async () => {
    try {
        const aiTools = await db.aiTool.findMany({
            include: aiToolInclusion,
            orderBy: {
                createdAt: "desc",
            },
            take: ITEMS_PER_PAGE,
        });

        const nextCursor = setNextCursor(aiTools);

        return {
            aiTools,
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

export const loadMoreTools = async (
    cursor: string,
    searchParams: SearhParams = {},
    params: Params,
    tags?: string[],
) => {
    try {
        let where = {};
        let orderBy: Prisma.AiToolOrderByWithRelationInput = {
            createdAt: "desc",
        };

        if (params["tag"]) {
            where = buildWhereClauseForTag(params["tag"]);
        } else if (searchParams["price_range"]) {
            where = combineWhereClauses(searchParams);
            orderBy = buildAiToolOrderByClause(searchParams);
        } else if (
            tags &&
            tags.length > 0 &&
            (searchParams["query"] || params["name"])
        ) {
            where = {
                Tags: {
                    some: {
                        tagName: {
                            in: tags,
                        },
                    },
                },
            };
        }

        const aiTools = await db.aiTool.findMany({
            take: ITEMS_PER_PAGE,
            skip: 1,
            cursor: { id: cursor },
            include: aiToolInclusion,
            orderBy,
            where,
        });

        const nextCursor = setNextCursor(aiTools);

        return {
            aiTools,
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

export const getToolsBySortAndFilter = async (searchParams: SearhParams) => {
    try {
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

export const getToolsByTag = async (tag: string) => {
    try {
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
        const aiTool = await db.aiTool.findFirst({
            where: {
                nameLowercase: name.toLocaleLowerCase(),
            },
            include: aiToolInclusion,
        });

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

// Helpers
const buildWhereClauseForTags = (tags: string | null) => {
    if (!tags) return {};

    const tagList = tags
        .split(",")
        .map(
            (tag) => tag.substring(0, 1).toLocaleUpperCase() + tag.substring(1),
        );

    const clause: Prisma.AiToolWhereInput = {
        Tags: {
            some: {
                tagName: {
                    in: tagList,
                },
            },
        },
    };

    return clause;
};

const priceRangeMappings: Record<string, Prisma.AiToolWhereInput> = {
    under25: {
        PriceInfo: {
            AND: [{ minPrice: { lt: 25 } }, { maxPrice: { lt: 25 } }],
        },
    },
    "25to75": {
        PriceInfo: {
            AND: [{ minPrice: { gte: 25 } }, { maxPrice: { lt: 75 } }],
        },
    },
    "75to100": {
        PriceInfo: {
            AND: [{ minPrice: { gte: 75 } }, { maxPrice: { lte: 100 } }],
        },
    },
    over100: {
        PriceInfo: {
            OR: [{ minPrice: { gt: 100 } }, { maxPrice: { gt: 100 } }],
        },
    },
};

const buildWhereClauseForPriceRange = (priceRange: string) =>
    priceRangeMappings[priceRange] || {};

const orderByMappings: Record<
    string,
    Record<string, Prisma.AiToolOrderByWithRelationInput>
> = {
    date: {
        asc: { createdAt: "asc" },
        desc: { createdAt: "desc" },
    },
    name: {
        asc: { name: "asc" },
        desc: { name: "desc" },
    },
    company: {
        asc: { companyName: "asc" },
        desc: { companyName: "desc" },
    },
    price: {
        asc: { PriceInfo: { averagePrice: "asc" } },
        desc: { PriceInfo: { averagePrice: "desc" } },
    },
};

const buildWhereClauseForTag = (tag: string) => {
    return {
        Tags: {
            some: {
                tagName: {
                    equals: tag,
                },
            },
        },
    };
};

// const buildWhereClauseForQuery = (generatedTags: string[] | undefined) => {
//     return {
//         Tags: {
//             some: {
//                 tagName: {
//                     in: generatedTags,
//                 },
//             },
//         },
//     };
// };

const buildAiToolOrderByClause = (searchParams: SearhParams) => {
    const sort = searchParams["sort"];
    const order = searchParams["order"] as "asc" | "desc";

    return orderByMappings[sort]?.[order] || {};
};

const combineWhereClauses = (searchParams: SearhParams) => {
    const tags = searchParams["tags"];
    const priceRange = searchParams["price_range"];

    const whereClauseForTags = buildWhereClauseForTags(tags);
    const whereClauseForPriceRange = buildWhereClauseForPriceRange(
        priceRange ?? "all",
    );

    return {
        AND: [whereClauseForTags, whereClauseForPriceRange],
    };
};
