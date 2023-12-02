import type { Tag } from "@prisma/client";
import aiToolsData from "../../data/aiToolsData.json";
import { db } from "@/server/db";

export default async function createTools() {
    for (const tool of aiToolsData) {
        try {
            const {
                affLink,
                companyName,
                createdAt,
                description,
                keyTakeaways,
                logoURL,
                priceInfo,
                screenshotURL,
                tags,
                toolName,
                toolNameLower,
                updatedAt,
                videoSource,
                websiteLink,
            } = tool;

            let minPrice = -1;
            let maxPrice = -1;

            if (priceInfo.amounts.length === 1) {
                if (priceInfo.amounts[0] === 0) {
                    minPrice = maxPrice = 0; // Free
                } else if (priceInfo.amounts[0] === -1) {
                    minPrice = maxPrice = -1; // Contact for pricing
                } else {
                    minPrice = maxPrice = priceInfo.amounts[0]; // Single fixed price
                }
            } else if (priceInfo.amounts.length === 2) {
                minPrice = priceInfo.amounts[1];
                maxPrice = priceInfo.amounts[0];
            }

            const newOrExistingTags = await getOrCreateTags(tags);

            console.log("=====================================");
            console.log("ABOUT TO INSERT:", tool.toolName);
            console.log("=====================================");

            const createdTool = await db.aiTool.create({
                data: {
                    affLink,
                    companyName,
                    createdAt: new Date(createdAt.seconds * 1000),
                    description,
                    KeyTakeaways: {
                        create: keyTakeaways.map((takeaway) => ({
                            takeaway,
                        })),
                    },
                    logoUrl: logoURL,
                    name: toolName,
                    nameLowercase: toolNameLower,
                    screenshotUrl: screenshotURL,
                    websiteLink,
                    videoSource,
                    updatedAt: new Date(updatedAt.seconds * 1000),
                    PriceInfo: {
                        create: {
                            linkToPricing: priceInfo.linkToPricing,
                            PriceAmounts: {
                                create: priceInfo.amounts.map((amount) => ({
                                    amount,
                                })),
                            },
                            PriceRanges: {
                                create: priceInfo.priceRanges?.map((range) => ({
                                    range,
                                })),
                            },
                            maxPrice,
                            minPrice,
                            averagePrice: (minPrice + maxPrice) / 2,
                            summary: priceInfo.summary,
                        },
                    },
                    Tags: {
                        connect: newOrExistingTags,
                    },
                    FavoritedBy: {
                        create: [],
                    },
                },
            });

            console.log(`Created ${createdTool.name} successfully`);
        } catch (error) {
            console.log("ERROR: ", error);
            console.log("TOOL: ", tool);
        }
    }
}

// export async function deleteTools() {
//     const aiTools = await db.aiTool.findMany();

//     for (const tool of aiTools) {
//         await db.aiTool.delete({
//             where: {
//                 id: tool.id,
//             },
//         });
//     }
// }

const fetchExistingTags = async (tags: string[]) => {
    return db.tag.findMany({
        where: {
            tagName: {
                in: tags,
            },
        },
    });
};

const createMissingTags = async (tags: string[], existingTags: Tag[]) => {
    const existingTagNames = new Set(existingTags.map((t) => t.tagName));
    const missingTagNames = tags.filter(
        (tagName) => !existingTagNames.has(tagName),
    );

    return Promise.all(
        missingTagNames.map((tagName) =>
            db.tag.create({
                data: { tagName },
            }),
        ),
    );
};

const getOrCreateTags = async (tags: string[]) => {
    const existingTags = await fetchExistingTags(tags);
    const newTags = await createMissingTags(tags, existingTags);

    return [...existingTags, ...newTags];
};
