import React, { useEffect, useState } from "react";

import type { SortCriterionOptionsType } from "@/types";
import cn from "@/utils/twMerge";
import useToolSortStore from "@/store/slices/tool_sort";

const SortCriterion = ({
    criterion,
}: {
    criterion: SortCriterionOptionsType;
}) => {
    const { selectedCriterion, setSelectedCriterion } = useToolSortStore(
        (state) => state,
    );
    const [isSelected, setIsSelected] = useState<boolean>(
        selectedCriterion === criterion,
    );

    useEffect(() => {
        if (criterion === selectedCriterion) {
            setIsSelected(true);
        } else {
            setIsSelected(false);
        }
    }, [criterion, selectedCriterion]);

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
                    setSelectedCriterion(criterion);
                }
            }}
        >
            {criterion}
        </li>
    );
};

export default SortCriterion;
