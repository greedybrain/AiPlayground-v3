import React, { useEffect, useState } from "react";

import type { PriceRangeOptionsType } from "@/types";
import cn from "@/utils/twMerge";
import useToolSortStore from "@/store/slices/tool_sort";

const PriceRangeOption = ({ range }: { range: PriceRangeOptionsType }) => {
    const { selectedRange, setSelectedRange } = useToolSortStore(
        (state) => state,
    );
    const [isSelected, setIsSelected] = useState<boolean>(
        selectedRange === range,
    );

    useEffect(() => {
        if (range === selectedRange) {
            setIsSelected(true);
        } else {
            setIsSelected(false);
        }
    }, [range, selectedRange]);

    return (
        <li
            className={cn(
                "border-2 border-secondary/20 bg-white",
                "cursor-pointer",
                "hover:bg-gray-100/50 hover:drop-shadow-sm",
                "px-3 py-2",
                "rounded-full",
                "text-sm text-center transition-all",
                {
                    "border-secondary": isSelected,
                },
            )}
            onClick={() => {
                if (!isSelected) {
                    setSelectedRange(range);
                }
            }}
        >
            {range}
        </li>
    );
};

export default PriceRangeOption;
