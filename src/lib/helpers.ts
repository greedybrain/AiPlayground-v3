import type { AiToolWithRelations } from "@/types";
import { ReadonlyURLSearchParams } from "next/navigation";

export const setNextCursor = (
    aiTools: AiToolWithRelations[],
    hasMoreItems: boolean = true,
    userId?: string,
) => {
    if (!hasMoreItems) {
        return "";
    }

    const lastToolId = aiTools[aiTools.length - 1]?.id;
    return userId ? `${userId}_${lastToolId}` : lastToolId;
};

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

export const initPathCheckForCorrectToolsRender = (
    pathname: string,
    tagAsString: string,
    nameAsString: string,
    searchParams: ReadonlyURLSearchParams,
) => {
    const isAiToolsSortAndFilterPath =
        pathname.startsWith("/ai_tools") &&
        searchParams.toString().includes("price_range");

    const isFavoritesPath = pathname.startsWith("/user/favorites");

    const isAiToolsForTagPath =
        pathname.startsWith("/ai_tools/tags") && !!tagAsString;

    const isAiToolsQueryPath =
        pathname.startsWith("/ai_tools/search") &&
        searchParams.toString().includes("query");

    const isAiToolByNamePath = pathname.startsWith("/tool") && !!nameAsString;

    return {
        isAiToolsForTagPath,
        isAiToolsQueryPath,
        isAiToolsSortAndFilterPath,
        isFavoritesPath,
        isAiToolByNamePath,
    };
};
