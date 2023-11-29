import React, { useState } from "react";
import { useParams, usePathname, useSearchParams } from "next/navigation";

import LoadingAnimation from "../LoadingAnimation";
import cn from "@/utils/twMerge";
import { loadMoreFavorites } from "@/server/actions/favorites";
import { loadMoreTools } from "@/server/actions/aitools";
import useAiToolStore from "@/store/slices/aitool";
import useFavoritesStore from "@/store/slices/favorite";

const LoadMoreToolsBtn = () => {
    const {
        favoritesCursor,
        addBatchToolsToFavoritesDictionary,
        setFavoritesCursor,
    } = useFavoritesStore((state) => state);

    const {
        cursor,
        sortAndFilterCursor,
        toolsByTagCursor,
        addAiToolsToDictionary,
        addAiToolsToSortedAndFilteredDictionary,
        addAiToolsByTagToDictionary,
        setCursor,
        setSortAndFitlerCursor,
        setToolsByTagCursor,
    } = useAiToolStore((state) => state);

    const [loading, setLoading] = useState<boolean>(false);
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const { tag } = useParams();

    const paramsRecord = Object.fromEntries(searchParams.entries());

    const isAiToolsPath = pathname.startsWith("/ai_tools");
    const isFavoritesPath = pathname.startsWith("/user/favorites");

    const currentCursor = isFavoritesPath
        ? favoritesCursor
        : isAiToolsPath && tag
        ? toolsByTagCursor
        : isAiToolsPath
        ? sortAndFilterCursor
        : cursor;

    const handleLoadMoreTools = async () => {
        if (loading || !currentCursor) return;

        setLoading(true);

        const action = isFavoritesPath ? loadMoreFavorites : loadMoreTools;

        const res = await action(
            currentCursor,
            isAiToolsPath ? paramsRecord : {},
            tag as string,
        );

        if (res.success) {
            const addFunction = isFavoritesPath
                ? addBatchToolsToFavoritesDictionary
                : isAiToolsPath && tag
                ? addAiToolsByTagToDictionary
                : isAiToolsPath
                ? addAiToolsToSortedAndFilteredDictionary
                : addAiToolsToDictionary;

            res.aiTools && addFunction(res.aiTools);

            const setCursorFunction = isFavoritesPath
                ? setFavoritesCursor
                : isAiToolsPath && tag
                ? setToolsByTagCursor
                : isAiToolsPath
                ? setSortAndFitlerCursor
                : setCursor;

            setCursorFunction(res.nextCursor || "");
        }

        setLoading(false);
    };

    if (!currentCursor) return null;

    return (
        <>
            {loading ? (
                <LoadingAnimation
                    style={{
                        width: 100,
                        marginTop: 40,
                    }}
                />
            ) : (
                <button
                    type="button"
                    className={cn(
                        "bg-primary border-2 border-secondary",
                        "disabled:bg-primary/70 disabled:text-secondary/50",
                        "font-bold flex",
                        "h-[60px]",
                        "items-center",
                        "justify-center",
                        "mt-20",
                        "rounded-lg",
                        "shadow-neobrut2 self-center",
                        "w-[150px]",
                    )}
                    onClick={handleLoadMoreTools}
                    disabled={loading}
                >
                    Load more
                </button>
            )}
        </>
    );
};

export default LoadMoreToolsBtn;
