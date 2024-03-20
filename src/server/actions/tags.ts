"use server";

import { AiToolWithRelations } from "@/types";
import { db } from "../db";
import { redis } from "../redis";

const TAGS_KEY = "tags";

export const getTags = async () => {
    try {
        const cachedData = await redis.get<AiToolWithRelations["Tags"]>(
            TAGS_KEY,
        );

        if (cachedData) {
            const tags = cachedData;

            return {
                tags,
                success: true,
            };
        }

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

        await redis.set<AiToolWithRelations["Tags"]>(TAGS_KEY, tags);
        await redis.expire(TAGS_KEY, 86400);

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
