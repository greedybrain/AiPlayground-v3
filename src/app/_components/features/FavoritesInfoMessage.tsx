"use client";

import { BiHappy } from "react-icons/bi";
import { FaRegFrownOpen } from "react-icons/fa";
import React from "react";
import Wrapper from "../ui/Wrapper";
import cn from "@/utils/twMerge";
import useFavoritesStore from "@/store/slices/favorite";

const FavoritesInfoMessage = () => {
    const { favoritesTotalCount } = useFavoritesStore((state) => state);

    const noFavorites = favoritesTotalCount === 0;

    const renderCount = () => {
        if (favoritesTotalCount === 0) {
            return null;
        } else if (favoritesTotalCount > 0) {
            return (
                <span className={cn("block", "font-bold", "text-lg")}>
                    {favoritesTotalCount === 1
                        ? `(${favoritesTotalCount} favorite)`
                        : `(${favoritesTotalCount} favorites)`}
                </span>
            );
        }

        return null;
    };

    return (
        <Wrapper>
            <Wrapper
                className={cn(
                    "flex flex-col",
                    "items-start",
                    "justify-start",
                    "left-3",
                    "mx-auto mt-10",
                    "relative",
                    "top-2",
                )}
            >
                <Wrapper
                    className={cn(
                        "bg-tertiary border-2 border-secondary",
                        "flex",
                        "h-[45px]",
                        "items-center",
                        "justify-center",
                        "rounded-lg -rotate-6",
                        "shadow-neobrut1",
                        "w-[45px]",
                    )}
                >
                    {noFavorites ? (
                        <FaRegFrownOpen size={25} />
                    ) : (
                        <BiHappy size={25} />
                    )}
                </Wrapper>
            </Wrapper>
            {noFavorites ? (
                <p
                    className={cn(
                        "font-extrabold",
                        "min-w-[300px] max-w-[330px]",
                        "text-4xl",
                    )}
                >
                    No
                    <br />
                    <span className={cn("text-primary")}>Favorites</span> exist
                </p>
            ) : (
                <Wrapper className={cn("flex flex-col")}>
                    <p
                        className={cn(
                            "font-extrabold",
                            "min-w-[300px] max-w-[330px]",
                            "text-4xl",
                        )}
                    >
                        Your{" "}
                        <span className={cn("text-primary")}>Favorites</span>{" "}
                        {renderCount()}
                    </p>
                </Wrapper>
            )}
        </Wrapper>
    );
};

export default FavoritesInfoMessage;
