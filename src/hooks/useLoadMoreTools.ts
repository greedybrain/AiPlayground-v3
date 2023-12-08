import { useCallback, useState } from "react";
import { useParams, usePathname, useSearchParams } from "next/navigation";

import { ITEMS_PER_PAGE } from "@/constants";
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
        toolInDetail,
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

    console.log("Tags Gen By Query: ", tagsGeneratedByQuery[0]);

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

    const searchParamRecords = Object.fromEntries(searchParams.entries());

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

        if (loadingMoreTools || totalCount <= ITEMS_PER_PAGE) return;
        if (loadedCount >= totalCount) {
            toast.success(`You've reached the end of the list.`, {
                style: darkModeStyle,
                duration: 5000,
                position: "bottom-center",
                id: "endOfList",
            });
            return;
        }

        setLoadingMoreTools(true);

        const action = isFavoritesPath ? loadMoreFavorites : loadMoreTools;
        try {
            const toolInDetailTags = toolInDetail.id
                ? toolInDetail.Tags.map((tag) => tag.tagName)
                : [];

            const res = await action(
                currentCursor,
                searchParamRecords,
                {
                    tag: decodedTag,
                    name: decodedName,
                },
                !!decodedName && toolInDetail.id
                    ? toolInDetailTags
                    : tagsGeneratedByQuery,
                isAiToolByNamePath ? toolInDetailTags : undefined,
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
            toast.error("An error occurred");
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
        searchParamRecords,
        setCursor,
        setFavoritesCursor,
        setSortAndFitlerCursor,
        setToolsByQueryCursor,
        setToolsByRelationCursor,
        setToolsByTagCursor,
        tagsGeneratedByQuery,
        toolInDetail.id,
        toolInDetail.Tags,
    ]);

    return { loadingMoreTools, loadMoreItems };
};

export default useLoadMoreTools;
