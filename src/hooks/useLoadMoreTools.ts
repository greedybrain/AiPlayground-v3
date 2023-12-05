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
    const { tag, name } = useParams();

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
        addAiToolsToToolsByRelationDictionary,
        cursor,
        sortAndFilterCursor,
        toolsByTagCursor,
        toolsByQueryCursor,
        toolsByRelationCursor,
        tagsGeneratedByQuery,
        toolAtGlance,
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
        tag as string,
        name as string,
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
                { tag: tag as string, name: name as string },
                !!name && toolAtGlance.id
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
        addAiToolsToToolsByRelationDictionary,
        addBatchToolsToFavoritesDictionary,
        currentCursor,
        isAiToolsForTagPath,
        isAiToolsSortAndFilterPath,
        isAiToolsQueryPath,
        isFavoritesPath,
        isAiToolByNamePath,
        loadingMoreTools,
        name,
        paramsRecord,
        setCursor,
        setFavoritesCursor,
        setSortAndFitlerCursor,
        setToolsByQueryCursor,
        setToolsByRelationCursor,
        setToolsByTagCursor,
        tag,
        tagsGeneratedByQuery,
        toolAtGlance.id,
        toolAtGlance.Tags,
    ]);

    return { loadingMoreTools, loadMoreItems };
};

export default useLoadMoreTools;
