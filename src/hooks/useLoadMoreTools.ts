import { useCallback, useState } from "react";
import { useParams, usePathname, useSearchParams } from "next/navigation";

import { AiToolWithRelations } from "@/types";
import { loadMoreFavorites } from "@/server/actions/favorites";
import { loadMoreTools } from "@/server/actions/aitools";
import toast from "react-hot-toast";
import useAiToolStore from "@/store/slices/aitool";
import useFavoritesStore from "@/store/slices/favorite";

const useLoadMoreTools = () => {
    const [loadingMoreTools, setLoadingMoreTools] = useState(false);
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const { tag } = useParams();

    const tagAsString = tag as string;

    const {
        favoritesDictionary,
        favoritesCursor,
        addBatchToolsToFavoritesDictionary,
        setFavoritesCursor,
    } = useFavoritesStore((state) => state);

    const {
        aiToolsDictionary,
        aiToolsByTagDictionary,
        aiToolsSortedAndFilteredDictionary,
        addAiToolsToDictionary,
        addAiToolsToSortedAndFilteredDictionary,
        addAiToolsByTagToDictionary,
        cursor,
        setCursor,
        setSortAndFitlerCursor,
        setToolsByTagCursor,
        sortAndFilterCursor,
        toolsByTagCursor,
    } = useAiToolStore((state) => state);

    const isAiToolsSortAndFilterPath =
        pathname.startsWith("/ai_tools") && !tagAsString;
    const isFavoritesPath = pathname.startsWith("/user/favorites");
    const isAiToolsForTagPath =
        pathname.startsWith("/ai_tools/tags") && tagAsString;

    const paramsRecord = Object.fromEntries(searchParams.entries());

    const currentCursor = isFavoritesPath
        ? favoritesCursor
        : isAiToolsForTagPath
        ? toolsByTagCursor
        : isAiToolsSortAndFilterPath
        ? sortAndFilterCursor
        : cursor;

    const loadMoreItems = useCallback(async () => {
        if (loadingMoreTools || !currentCursor) return;

        setLoadingMoreTools(true);

        const action = isFavoritesPath ? loadMoreFavorites : loadMoreTools;
        try {
            const res = await action(
                currentCursor,
                isAiToolsSortAndFilterPath ? paramsRecord : {},
                tagAsString,
            );

            if (res.success) {
                const addFunction = isFavoritesPath
                    ? addBatchToolsToFavoritesDictionary
                    : isAiToolsForTagPath
                    ? addAiToolsByTagToDictionary
                    : isAiToolsSortAndFilterPath
                    ? addAiToolsToSortedAndFilteredDictionary
                    : addAiToolsToDictionary;

                res.aiTools && addFunction(res.aiTools);

                const setCursorFunction = isFavoritesPath
                    ? setFavoritesCursor
                    : isAiToolsForTagPath
                    ? setToolsByTagCursor
                    : isAiToolsSortAndFilterPath
                    ? setSortAndFitlerCursor
                    : setCursor;

                setCursorFunction(res.nextCursor || "");
            }
        } catch (error: any) {
            toast.error(error?.message || "An error occurred");
        } finally {
            setLoadingMoreTools(false);
        }
    }, [
        addAiToolsByTagToDictionary,
        addAiToolsToDictionary,
        addAiToolsToSortedAndFilteredDictionary,
        addBatchToolsToFavoritesDictionary,
        currentCursor,
        isAiToolsForTagPath,
        isAiToolsSortAndFilterPath,
        isFavoritesPath,
        loadingMoreTools,
        paramsRecord,
        setCursor,
        setFavoritesCursor,
        setSortAndFitlerCursor,
        setToolsByTagCursor,
        tagAsString,
    ]);

    let aiToolsArray: AiToolWithRelations[];

    if (isAiToolsSortAndFilterPath) {
        aiToolsArray = Object.values(aiToolsSortedAndFilteredDictionary);
    } else if (isFavoritesPath) {
        aiToolsArray = Object.values(favoritesDictionary);
    } else if (isAiToolsForTagPath) {
        aiToolsArray = Object.values(aiToolsByTagDictionary);
    } else {
        aiToolsArray = Object.values(aiToolsDictionary);
    }

    return { aiToolsArray, loadingMoreTools, loadMoreItems };
};

export default useLoadMoreTools;
