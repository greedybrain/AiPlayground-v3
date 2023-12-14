import { Prisma } from "@prisma/client";

export type SearchParams = Record<string, string>;

const buildWhereClauseForTags = (tags: string | null) => {
    if (!tags) return {};

    const fixCaseSensitivity = (str: string) =>
        str.substring(0, 1).toLocaleUpperCase() + str.substring(1);

    const tagList = tags.split(",").map((tag) =>
        tag.includes(" ")
            ? tag
                  .split(" ")
                  .map((t) => fixCaseSensitivity(t))
                  .join(" ")
            : fixCaseSensitivity(tag),
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

export const buildWhereClauseForTag = (tag: string) => {
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

export const buildAiToolOrderByClause = (searchParams: SearchParams) => {
    const sort = searchParams["sort"];
    const order = searchParams["order"] as "asc" | "desc";

    return orderByMappings[sort]?.[order] || {};
};

export const combineWhereClauses = (searchParams: SearchParams) => {
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
