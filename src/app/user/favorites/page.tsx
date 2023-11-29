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

const Favorites = async () => {
    await redirectIfUnauthorized();

    return (
        <Wrapper className={cn("mx-auto max-w-[1200px]", "w-11/12")}>
            <Wrapper>
                <FavoritesInfoMessage />
                <p
                    className={cn(
                        "font-semibold",
                        "mt-6 max-w-[650px]",
                        "text-sm text-left",
                    )}
                >
                    All of your favorite tools and resources will be displayed
                    here. Go back to the list of tools to find and add more
                    tools to your favorites.
                </p>

                {/* <Wrapper className={cn("mt-10", "px-4")}>
                    <Link
                        href="/"
                        className={cn(
                            "bg-primary border-2 border-secondary",
                            "font-bold flex",
                            "h-[60px]",
                            "items-center",
                            "justify-center",
                            "mt-10",
                            "rounded-lg",
                            "shadow-neobrut2 self-center",
                            "w-[150px]",
                        )}
                    >
                        Back to home
                    </Link>
                </Wrapper> */}
            </Wrapper>
            <Wrapper className={cn("mt-10")}>
                <AiToolList />
            </Wrapper>
        </Wrapper>
    );
};

export default Favorites;
