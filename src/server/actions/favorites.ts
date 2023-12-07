"use server";

import { ITEMS_PER_PAGE } from "@/constants";
import { aiToolInclusion } from "@/utils/prismaHelper";
import { db } from "../db";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { setNextCursor } from "@/lib/helpers";

export const getUserFavoriteTools = async () => {
    try {
        const session = await getServerSession(options);

        if (!session) throw new Error("You must be logged in to do that");

        const userId = session.user.id;

        const aiTools = (
            await db.userFavoriteAiTool.findMany({
                where: {
                    userId,
                },
                include: {
                    AiTool: {
                        include: aiToolInclusion,
                    },
                },
                take: ITEMS_PER_PAGE,
                orderBy: {
                    createdAt: "desc",
                },
            })
        ).map((tool) => tool.AiTool);

        const totalCount = await db.userFavoriteAiTool.count({
            where: {
                userId,
            },
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

export const loadMoreFavorites = async (aiToolId: string) => {
    try {
        const session = await getServerSession(options);

        if (!session) throw new Error("You must be logged in to do that");

        const userId = session.user.id;

        const aiToolsPlusOne = (
            await db.userFavoriteAiTool.findMany({
                take: ITEMS_PER_PAGE + 1,
                skip: 1,
                cursor: {
                    userId_aiToolId: {
                        userId,
                        aiToolId,
                    },
                },
                include: {
                    AiTool: {
                        include: aiToolInclusion,
                    },
                },
                where: {
                    userId,
                },
            })
        ).map((tool) => tool.AiTool);

        const hasMoreItems = aiToolsPlusOne.length > ITEMS_PER_PAGE;
        const aiTools = aiToolsPlusOne.slice(0, ITEMS_PER_PAGE);

        const nextCursor = setNextCursor(aiTools, hasMoreItems, userId);

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

export const checkIfFavorited = async (toolId: string) => {
    try {
        const session = await getServerSession(options);

        if (!session) return;

        const userId = session.user.id;

        const favAiTool = await db.userFavoriteAiTool.findUnique({
            where: {
                userId_aiToolId: {
                    aiToolId: toolId,
                    userId,
                },
            },
        });

        return !!favAiTool;
    } catch (error) {
        return {
            error,
            success: false,
        };
    }
};

export const addFavorite = async (toolId: string) => {
    try {
        const session = await getServerSession(options);

        if (!session) throw new Error("You must be logged in to do that");

        const userId = session.user.id;

        const aiTool = (
            await db.userFavoriteAiTool.create({
                data: {
                    aiToolId: toolId,
                    userId,
                },
                include: {
                    AiTool: {
                        include: aiToolInclusion,
                    },
                },
            })
        ).AiTool;

        if (!aiTool.id)
            throw new Error("Something went wrong. Try again later.");

        return {
            aiTool,
            message: "Tool added successfully",
            success: true,
        };
    } catch (error: any) {
        return {
            message: error.message as string,
            success: false,
        };
    }
};

export const removeFavorite = async (toolId: string) => {
    try {
        const session = await getServerSession(options);

        if (!session) throw new Error("You must be logged in to do that");

        const userId = session.user.id;

        const removedTool = (
            await db.userFavoriteAiTool.delete({
                where: {
                    userId_aiToolId: {
                        aiToolId: toolId,
                        userId,
                    },
                },
                include: {
                    AiTool: {
                        include: aiToolInclusion,
                    },
                },
            })
        ).AiTool;

        if (!removedTool.id) throw new Error("Couldn't remove tool");

        const aiTool = await db.aiTool.findUnique({
            where: {
                id: toolId,
            },
            include: aiToolInclusion,
        });

        if (!aiTool) throw new Error("Something went wrong. Try again later.");

        return {
            aiTool,
            message: "Tool removed successfully",
            success: true,
        };
    } catch (error: any) {
        return {
            message: error.message as string,
            success: false,
        };
    }
};
