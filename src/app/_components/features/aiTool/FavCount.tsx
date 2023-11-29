import type { FavCountProps } from "@/types";
import React from "react";
import cn from "@/utils/twMerge";

const FavCount = ({ count }: FavCountProps) => {
    return (
        <span
            id="BookmarkCountBadge"
            className={cn(
                "bg-secondary",
                "flex font-semibold",
                "h-[25px]",
                "items-center",
                "justify-center",
                "rounded-full",
                "text-white text-sm",
                "w-[25px]",
            )}
        >
            {count}
        </span>
    );
};

export default FavCount;
