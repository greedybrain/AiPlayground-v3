import type { AiToolWithRelations } from "@/types";
import React from "react";
import cn from "@/utils/twMerge";

const FixedPrice = ({
    priceInfo,
}: {
    priceInfo: AiToolWithRelations["PriceInfo"];
    name: AiToolWithRelations["name"];
}) => {
    if (priceInfo) {
        const { minPrice, maxPrice } = priceInfo;

        if (minPrice === maxPrice && maxPrice > 0) {
            return (
                <>
                    <p className={cn("text-sm text-secondary/70")}>
                        {`${name} has a fixed price of`}
                    </p>
                    <p className={cn("font-semibold", "text-lg")}>{maxPrice}</p>
                </>
            );
        }
    }

    return null;
};

export default FixedPrice;
