import type { AiToolWithRelations } from "@/types";
import { ITEMS_PER_PAGE } from "@/constants";

export const setNextCursor = (
    aiTools: AiToolWithRelations[],
    userId?: string,
) =>
    aiTools.length === ITEMS_PER_PAGE
        ? userId
            ? `${userId}_${aiTools[aiTools.length - 1].id}`
            : aiTools[aiTools.length - 1].id
        : "";
