import { useCallback, useState } from "react";
import { useParams, usePathname, useSearchParams } from "next/navigation";

import { darkModeStyle } from "@/utils/darkModeToast";
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
    const { tag, name } = useParams();

    const decodedTag = decodeURIComponent(tag as string);
    const decodedName = decodeURIComponent(name as string);

    const {
        favoritesCursor,
        favoritesDictionary,
        favoritesTotalCount,
        addBatchToolsToFavoritesDictionary,
        setFavoritesCursor,
    } = useFavoritesStore((state) => state);

    const {
        aiToolsByQueryDictionary,
        aiToolsByTagDictionary,
        aiToolsDictionary,
        aiToolsSortedAndFilteredDictionary,
        addAiToolsToDictionary,
        addAiToolsToSortedAndFilteredDictionary,
        addAiToolsByTagToDictionary,
        addAiToolsToToolsByQueryDictionary,
        addAiToolsToToolsByRelationDictionary,
        cursor,
        sortAndFilterCursor,
        toolsByTagCursor,
        toolsByQueryCursor,
        toolsByRelationCursor,
        tagsGeneratedByQuery,
        toolAtGlance,
        totalDefaultToolsCount,
        totalSortAndFilterCount,
        totalToolsByQueryCount,
        totalToolsByTagCount,
        setCursor,
        setSortAndFitlerCursor,
        setToolsByTagCursor,
        setToolsByQueryCursor,
        setToolsByRelationCursor,
    } = useAiToolStore((state) => state);

    // PATHS CHECK
    const {
        isAiToolsForTagPath,
        isAiToolsQueryPath,
        isAiToolsSortAndFilterPath,
        isFavoritesPath,
        isAiToolByNamePath,
    } = initPathCheckForCorrectToolsRender(
        pathname,
        decodedTag,
        decodedName,
        searchParams,
    );
    // END OF PATHS CHECK

    const paramsRecord = Object.fromEntries(searchParams.entries());

    const currentCursor = isFavoritesPath
        ? favoritesCursor
        : isAiToolsForTagPath
        ? toolsByTagCursor
        : isAiToolsSortAndFilterPath
        ? sortAndFilterCursor
        : isAiToolsQueryPath
        ? toolsByQueryCursor
        : isAiToolByNamePath
        ? toolsByRelationCursor
        : cursor;

    const getCurrentCounts = useCallback(() => {
        let loadedCount = 0;
        let totalCount = 0;

        if (isFavoritesPath) {
            loadedCount = Object.values(favoritesDictionary).length;
            totalCount = favoritesTotalCount;
        } else if (isAiToolsForTagPath) {
            loadedCount = Object.values(aiToolsByTagDictionary).length;
            totalCount = totalToolsByTagCount;
        } else if (isAiToolsSortAndFilterPath) {
            loadedCount = Object.values(
                aiToolsSortedAndFilteredDictionary,
            ).length;
            totalCount = totalSortAndFilterCount;
        } else if (isAiToolsQueryPath) {
            loadedCount = Object.values(aiToolsByQueryDictionary).length;
            totalCount = totalToolsByQueryCount;
        } else {
            loadedCount = Object.values(aiToolsDictionary).length;
            totalCount = totalDefaultToolsCount;
        }

        return { loadedCount, totalCount };
    }, [
        aiToolsByQueryDictionary,
        aiToolsByTagDictionary,
        aiToolsDictionary,
        aiToolsSortedAndFilteredDictionary,
        favoritesDictionary,
        favoritesTotalCount,
        isAiToolsForTagPath,
        isAiToolsQueryPath,
        isAiToolsSortAndFilterPath,
        isFavoritesPath,
        totalDefaultToolsCount,
        totalSortAndFilterCount,
        totalToolsByQueryCount,
        totalToolsByTagCount,
    ]);

    const loadMoreItems = useCallback(async () => {
        const { loadedCount, totalCount } = getCurrentCounts();

        if (loadingMoreTools) return;
        if (loadedCount >= totalCount) {
            toast.success(`You've reached the end of the list.`, {
                style: darkModeStyle,
                duration: 5000,
                position: "bottom-center",
            });
            return;
        }

        setLoadingMoreTools(true);

        const action = isFavoritesPath ? loadMoreFavorites : loadMoreTools;
        try {
            const res = await action(
                currentCursor,
                paramsRecord,
                {
                    tag: decodedTag,
                    name: decodedName,
                },
                !!decodedName && toolAtGlance.id
                    ? toolAtGlance.Tags.map((tag) => tag.tagName)
                    : tagsGeneratedByQuery,
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
                    : isAiToolByNamePath
                    ? addAiToolsToToolsByRelationDictionary
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
                    : isAiToolByNamePath
                    ? setToolsByRelationCursor
                    : setCursor;

                res.nextCursor && setCursorFunction(res.nextCursor);
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
        addAiToolsToToolsByRelationDictionary,
        addBatchToolsToFavoritesDictionary,
        currentCursor,
        decodedName,
        decodedTag,
        getCurrentCounts,
        isAiToolsForTagPath,
        isAiToolsSortAndFilterPath,
        isAiToolsQueryPath,
        isFavoritesPath,
        isAiToolByNamePath,
        loadingMoreTools,
        paramsRecord,
        setCursor,
        setFavoritesCursor,
        setSortAndFitlerCursor,
        setToolsByQueryCursor,
        setToolsByRelationCursor,
        setToolsByTagCursor,
        tagsGeneratedByQuery,
        toolAtGlance.id,
        toolAtGlance.Tags,
    ]);

    return { loadingMoreTools, loadMoreItems };
};

export default useLoadMoreTools;
