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

export const capitalizeWordsWithSeparators = (inputString: string) => {
    if (!inputString) return "";

    let sanitizedString = inputString;

    if (inputString.includes("%20")) {
        sanitizedString = decodeURIComponent(inputString)
            .split(" ")
            .map((word) => word[0].toLocaleUpperCase() + word.substring(1))
            .join(" ");
    } else if (inputString.includes("-")) {
        sanitizedString = inputString
            .split("-")
            .map((word) => word[0].toLocaleUpperCase() + word.substring(1))
            .join("-");
    }

    return sanitizedString;
};
