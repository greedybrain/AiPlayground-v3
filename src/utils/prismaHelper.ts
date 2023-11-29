export const aiToolInclusion = {
    FavoritedBy: {
        include: {
            User: true,
        },
    },
    KeyTakeaways: true,
    PriceInfo: {
        include: {
            PriceRanges: true,
            PriceAmounts: true,
        },
    },
    Tags: {
        include: {
            AiTools: {
                select: {
                    id: true,
                    name: true,
                    nameLowercase: true,
                },
            },
        },
    },
};
