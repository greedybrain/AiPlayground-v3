"use client";

import AiToolList from "./AiToolList";
import FavoritesInfoMessage from "../features/FavoritesInfoMessage";
import React from "react";
import Wrapper from "./Wrapper";
import cn from "@/utils/twMerge";
import useUserFavoriteToolsFetcher from "@/hooks/useUserFavoriteToolsFetcher";

const FavoritesPageContent = () => {
    useUserFavoriteToolsFetcher();

    return (
        <>
            <Wrapper className={cn("px-4")}>
                <FavoritesInfoMessage />
                <p
                    className={cn(
                        "font-semibold",
                        "mt-6 max-w-[650px]",
                        "text-sm text-left",
                    )}
                >
                    Explore all of your favorite tools and resources in one
                    place.
                </p>
            </Wrapper>
            <Wrapper className={cn("mt-10")}>
                <AiToolList />
            </Wrapper>
        </>
    );
};

export default FavoritesPageContent;
