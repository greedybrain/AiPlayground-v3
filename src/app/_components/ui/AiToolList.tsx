"use client";

import React, { useEffect, useRef } from "react";
import { useParams, usePathname, useSearchParams } from "next/navigation";

import AiTool from "../features/aiTool/AiTool";
import { AiToolWithRelations } from "@/types";
import LoadingAnimation from "../features/LoadingAnimation";
import SortHandler from "../features/SortHandler";
import Wrapper from "./Wrapper";
import cn from "@/utils/twMerge";
import { initPathCheckForCorrectToolsRender } from "@/lib/helpers";
import useAiToolStore from "@/store/slices/aitool";
import useFavoritesStore from "@/store/slices/favorite";
import useLoadMoreTools from "@/hooks/useLoadMoreTools";

const AiToolList = () => {
    const { loadMoreItems, loadingMoreTools } = useLoadMoreTools();

    const pathname = usePathname();
    const { tag } = useParams();
    const searchParams = useSearchParams();

    const { loadingFavorites, favoritesDictionary } = useFavoritesStore(
        (state) => state,
    );
    const {
        loadingTools,
        loadingSortAndFilteredTools,
        loadingToolsByTag,
        loadingToolsByQuery,
        aiToolsByQueryDictionary,
        aiToolsByTagDictionary,
        aiToolsSortedAndFilteredDictionary,
        aiToolsDictionary,
    } = useAiToolStore((state) => state);

    const listEndRef = useRef<HTMLLIElement | null>(null);

    useEffect(() => {
        const copyListEndRefRef = listEndRef.current;
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    loadMoreItems();
                }
            },
            { threshold: 1.0 },
        );

        if (listEndRef.current) {
            observer.observe(listEndRef.current);
        }

        return () => {
            if (copyListEndRefRef) {
                observer.disconnect();
            }
        };
    }, [listEndRef, loadMoreItems]);

    const tagAsString = tag as string;

    // PATHS CHECK
    const {
        isAiToolsForTagPath,
        isAiToolsQueryPath,
        isAiToolsSortAndFilterPath,
        isFavoritesPath,
    } = initPathCheckForCorrectToolsRender(pathname, tagAsString, searchParams);
    // END OF PATHS CHECK

    let aiToolsArray: AiToolWithRelations[];

    if (isFavoritesPath) {
        aiToolsArray = Object.values(favoritesDictionary);
    } else if (isAiToolsSortAndFilterPath) {
        aiToolsArray = Object.values(aiToolsSortedAndFilteredDictionary);
    } else if (isAiToolsForTagPath) {
        aiToolsArray = Object.values(aiToolsByTagDictionary);
    } else if (isAiToolsQueryPath) {
        aiToolsArray = Object.values(aiToolsByQueryDictionary);
    } else {
        aiToolsArray = Object.values(aiToolsDictionary);
    }

    const isLoading =
        loadingTools ||
        loadingSortAndFilteredTools ||
        loadingFavorites ||
        loadingToolsByTag ||
        loadingToolsByQuery;

    if (isLoading)
        return <LoadingAnimation style={{ width: 100, marginTop: 100 }} />;

    return (
        <Wrapper className={cn("flex flex-col")}>
            <>
                <Wrapper>
                    <SortHandler />
                </Wrapper>
                <ul
                    className={cn(
                        "grid grid-cols-[repeat(auto-fill,minmax(300px,360px))] gap-8",
                        "justify-center",
                        "max-w-[1200px]",
                        {
                            "justify-start px-4": aiToolsArray.length < 3,
                        },
                    )}
                >
                    {aiToolsArray.map((tool, index) => {
                        return <AiTool key={tool.id} index={index} {...tool} />;
                    })}
                    <li ref={listEndRef} />
                </ul>
                {loadingMoreTools && (
                    <LoadingAnimation style={{ width: 100, marginTop: 40 }} />
                )}
            </>
        </Wrapper>
    );
};

export default AiToolList;
