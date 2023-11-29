import React from "react";
import SortCriterion from "./SortCriterion";
import { SortCriterionOptionsType } from "@/types";
import Wrapper from "../ui/Wrapper";
import cn from "@/utils/twMerge";
import useToolSortStore from "@/store/slices/tool_sort";

const SortCriterions = () => {
    const { selectedCriterion, criterions } = useToolSortStore(
        (state) => state,
    );

    return (
        <Wrapper className={cn("mt-10", "px-6 pb-10")}>
            <h2 className={cn("font-medium", "mb-4")}>
                Sort By{" "}
                <span className={cn("font-medium", "ml-1", "text-sm")}>
                    {!selectedCriterion
                        ? "(Select a sort by method)"
                        : `(${selectedCriterion})`}
                </span>
            </h2>
            <ul className={cn("flex flex-wrap", "gap-3")}>
                {Object.keys(criterions).map((criterion) => {
                    return (
                        <SortCriterion
                            key={criterion}
                            criterion={criterion as SortCriterionOptionsType}
                        />
                    );
                })}
            </ul>
        </Wrapper>
    );
};

export default SortCriterions;
