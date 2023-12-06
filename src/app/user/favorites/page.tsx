import AiToolList from "@/app/_components/ui/AiToolList";
import FavoritesInfoMessage from "@/app/_components/features/FavoritesInfoMessage";
import { Metadata } from "next";
import React from "react";
import Wrapper from "@/app/_components/ui/Wrapper";
import cn from "@/utils/twMerge";
import { redirectIfUnauthorized } from "@/server/helper";

export const metadata: Metadata = {
    title: "AiPlayground - Your Favorites",
    description: "User's favorites/bookmarks page",
};

const FavoritesPage = async () => {
    await redirectIfUnauthorized();

    return (
        <Wrapper className={cn("mx-auto max-w-[1200px]", "w-11/12")}>
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
        </Wrapper>
    );
};

export default FavoritesPage;
