import type { IHighlightContent } from "@/types";
import React from "react";
import cn from "@/utils/twMerge";

const AIBannerHighlight = ({ content, extra }: IHighlightContent) => {
    return (
        <li
            className={cn(
                "flex",
                "gap-6",
                "items-center",
                "-left-20",
                "mr-6",
                "relative",
            )}
        >
            <p className={cn("border", "font-bold", "text-2xl", "w-[350px]")}>
                {content}
            </p>
            <p
                className={cn(
                    "border border-black bg-secondary",
                    "flex font-bold",
                    "h-[40px]",
                    "items-center",
                    "justify-center",
                    "rounded-full",
                    "text-center text-sm  text-white",
                    "w-[150px] ",
                )}
            >
                {extra}
            </p>
        </li>
    );
};

export default AIBannerHighlight;
