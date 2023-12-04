import { useCallback, useState } from "react";
import { useParams, usePathname, useSearchParams } from "next/navigation";

import { initPathCheckForCorrectToolsRender } from "@/lib/helpers";
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
        favoritesCursor,
        addBatchToolsToFavoritesDictionary,
        setFavoritesCursor,
    } = useFavoritesStore((state) => state);

    const {
        addAiToolsToDictionary,
        addAiToolsToSortedAndFilteredDictionary,
        addAiToolsByTagToDictionary,
        addAiToolsToToolsByQueryDictionary,
        cursor,
        sortAndFilterCursor,
        toolsByTagCursor,
        toolsByQueryCursor,
        tagsGeneratedByQuery,
        setCursor,
        setSortAndFitlerCursor,
        setToolsByTagCursor,
        setToolsByQueryCursor,
    } = useAiToolStore((state) => state);

    // PATHS CHECK
    const {
        isAiToolsForTagPath,
        isAiToolsQueryPath,
        isAiToolsSortAndFilterPath,
        isFavoritesPath,
    } = initPathCheckForCorrectToolsRender(pathname, tagAsString, searchParams);
    // END OF PATHS CHECK

    console.log(isAiToolsForTagPath);

    const paramsRecord = Object.fromEntries(searchParams.entries());

    const currentCursor = isFavoritesPath
        ? favoritesCursor
        : isAiToolsForTagPath
        ? toolsByTagCursor
        : isAiToolsSortAndFilterPath
        ? sortAndFilterCursor
        : isAiToolsQueryPath
        ? toolsByQueryCursor
        : cursor;

    const loadMoreItems = useCallback(async () => {
        if (loadingMoreTools || !currentCursor) return;

        setLoadingMoreTools(true);

        const action = isFavoritesPath ? loadMoreFavorites : loadMoreTools;
        try {
            const res = await action(
                currentCursor,
                isAiToolsSortAndFilterPath || isAiToolsQueryPath
                    ? paramsRecord
                    : {},
                tagAsString,
                tagsGeneratedByQuery,
            );

            if (res.success) {
                const addFunction = isFavoritesPath
                    ? addBatchToolsToFavoritesDictionary
                    : isAiToolsForTagPath
                    ? addAiToolsByTagToDictionary
                    : isAiToolsSortAndFilterPath
                    ? addAiToolsToSortedAndFilteredDictionary
                    : isAiToolsQueryPath
                    ? addAiToolsToToolsByQueryDictionary
                    : addAiToolsToDictionary;

                res.aiTools && addFunction(res.aiTools);

                const setCursorFunction = isFavoritesPath
                    ? setFavoritesCursor
                    : isAiToolsForTagPath
                    ? setToolsByTagCursor
                    : isAiToolsSortAndFilterPath
                    ? setSortAndFitlerCursor
                    : isAiToolsQueryPath
                    ? setToolsByQueryCursor
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
        addAiToolsToToolsByQueryDictionary,
        addBatchToolsToFavoritesDictionary,
        currentCursor,
        isAiToolsForTagPath,
        isAiToolsSortAndFilterPath,
        isAiToolsQueryPath,
        isFavoritesPath,
        loadingMoreTools,
        paramsRecord,
        setCursor,
        setFavoritesCursor,
        setSortAndFitlerCursor,
        setToolsByQueryCursor,
        setToolsByTagCursor,
        tagAsString,
        tagsGeneratedByQuery,
    ]);

    return { loadingMoreTools, loadMoreItems };
};

export default useLoadMoreTools;
