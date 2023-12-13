import FavoritesPageContent from "@/app/_components/ui/FavoritesPageContent";
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
            <FavoritesPageContent />
        </Wrapper>
    );
};

export default FavoritesPage;
