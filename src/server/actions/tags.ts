"use server";

import { db } from "../db";

export const getTags = async () => {
    try {
        const tags = await db.tag.findMany({
            orderBy: {
                tagName: "asc",
            },
            include: {
                AiTools: {
                    select: {
                        id: true,
                        name: true,
                        nameLowercase: true,
                    },
                },
            },
        });

        return {
            tags,
            success: true,
        };
    } catch (error) {
        return {
            error,
            success: false,
        };
    }
};
