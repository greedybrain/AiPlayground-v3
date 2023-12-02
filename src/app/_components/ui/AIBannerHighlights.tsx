import AIBannerHighlight from "./AIBannerHighlight";
import type { IHighlightContent } from "@/types";
import React from "react";
import cn from "@/utils/twMerge";

const AIBannerHighlights = () => {
    const getHighlightContents = () => {
        const contents: IHighlightContent[] = [];

        for (let i = 0; i <= 100; i++) {
            contents.push({
                id: i,
                content: "EXPANSIVE AI DIRECTORY",
                extra: "AI UNLEASHED",
            });
        }

        return contents;
    };

    return (
        <ul
            className={cn(
                "bg-tertiary border-t-2 border-b-2 border-secondary",
                "flex",
                "h-[70px]",
                "mt-20",
                "overflow-hidden",
                "px-4",
                "w-full",
            )}
        >
            {getHighlightContents().map((content) => (
                <AIBannerHighlight key={content.id} {...content} />
            ))}
        </ul>
    );
};

export default AIBannerHighlights;
