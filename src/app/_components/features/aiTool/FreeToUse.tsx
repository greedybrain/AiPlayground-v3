import type { AiToolWithRelations } from "@/types";
import React from "react";
import cn from "@/utils/twMerge";

const FreeToUse = ({
    priceInfo,
}: {
    priceInfo: AiToolWithRelations["PriceInfo"];
}) => {
    if (priceInfo) {
        const { minPrice, maxPrice } = priceInfo;

        if (minPrice === maxPrice && maxPrice === 0) {
            return (
                <p className={cn("font-semibold", "text-lg")}>Free to use</p>
            );
        }
    }

    return null;
};

export default FreeToUse;
