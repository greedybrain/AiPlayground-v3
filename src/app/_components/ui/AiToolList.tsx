"use client";

import { useParams, usePathname } from "next/navigation";

import AiTool from "../features/aiTool/AiTool";
import { AiToolWithRelations } from "@/types";
import LoadMoreToolsBtn from "../features/aiTool/LoadMoreToolsBtn";
import LoadingAnimation from "../features/LoadingAnimation";
import React from "react";
import SortHandler from "../features/SortHandler";
import Wrapper from "./Wrapper";
import cn from "@/utils/twMerge";
import useAiToolStore from "@/store/slices/aitool";
import useFavoritesStore from "@/store/slices/favorite";

const AiToolList = () => {
    const pathname = usePathname();
    const { tag } = useParams();

    const { favoritesDictionary, loadingFavorites } = useFavoritesStore(
        (state) => state,
    );

    const {
        aiToolsDictionary,
        aiToolsSortedAndFilteredDictionary,
        aiToolsByTagDictionary,
        loadingTools,
        loadingSortAndFilteredTools,
        loadingToolsByTag,
    } = useAiToolStore((state) => state);

    let aiToolsArray: AiToolWithRelations[];

    if (pathname.startsWith("/ai_tools") && !(tag as string)) {
        aiToolsArray = Object.values(aiToolsSortedAndFilteredDictionary);
    } else if (pathname.startsWith("/user/favorites")) {
        aiToolsArray = Object.values(favoritesDictionary);
    } else if (pathname.startsWith("/ai_tools/tags") && !!(tag as string)) {
        aiToolsArray = Object.values(aiToolsByTagDictionary);
    } else {
        aiToolsArray = Object.values(aiToolsDictionary);
    }

    const isLoading =
        loadingTools ||
        loadingSortAndFilteredTools ||
        loadingFavorites ||
        loadingToolsByTag;

    return (
        <Wrapper className={cn("flex flex-col")}>
            {isLoading ? (
                <LoadingAnimation style={{ width: 100, marginTop: 100 }} />
            ) : (
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
                            return (
                                <AiTool key={tool.id} index={index} {...tool} />
                            );
                        })}
                    </ul>
                </>
            )}
            <LoadMoreToolsBtn />
        </Wrapper>
    );
};

export default AiToolList;
