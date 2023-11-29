import PriceRangeOption from "./PriceRangeOption";
import { PriceRangeOptionsType } from "@/types";
import React from "react";
import Wrapper from "../ui/Wrapper";
import cn from "@/utils/twMerge";
import useToolSortStore from "@/store/slices/tool_sort";

const PriceRangeOptions = () => {
    const { ranges, selectedRange } = useToolSortStore((state) => state);

    return (
        <Wrapper className={cn("mt-10", "px-6")}>
            <h2 className={cn("font-medium", "mb-4")}>
                Price Range{" "}
                <span className={cn("font-medium", "ml-1", "text-sm")}>
                    {!selectedRange
                        ? "(Select a price range)"
                        : `(${selectedRange})`}
                </span>
            </h2>
            <ul className={cn("flex flex-wrap", "gap-3")}>
                {Object.keys(ranges).map((range) => {
                    return (
                        <PriceRangeOption
                            key={range}
                            range={range as PriceRangeOptionsType}
                        />
                    );
                })}
            </ul>
        </Wrapper>
    );
};

export default PriceRangeOptions;
