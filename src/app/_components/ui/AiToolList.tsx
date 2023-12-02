"use client";

import React, { useEffect, useRef } from "react";

import AiTool from "../features/aiTool/AiTool";
import LoadingAnimation from "../features/LoadingAnimation";
import SortHandler from "../features/SortHandler";
import Wrapper from "./Wrapper";
import cn from "@/utils/twMerge";
import useAiToolStore from "@/store/slices/aitool";
import useFavoritesStore from "@/store/slices/favorite";
import useLoadMoreTools from "@/hooks/useLoadMoreTools";

const AiToolList = () => {
    const { aiToolsArray, loadMoreItems, loadingMoreTools } =
        useLoadMoreTools();

    const { loadingFavorites } = useFavoritesStore((state) => state);
    const { loadingTools, loadingSortAndFilteredTools, loadingToolsByTag } =
        useAiToolStore((state) => state);

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

    const isLoading =
        loadingTools ||
        loadingSortAndFilteredTools ||
        loadingFavorites ||
        loadingToolsByTag;

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
