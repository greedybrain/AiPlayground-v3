import type { AiToolWithRelations } from "@/types";
import React from "react";
import cn from "@/utils/twMerge";

const PriceVariation = ({
    priceInfo,
}: {
    priceInfo: AiToolWithRelations["PriceInfo"];
}) => {
    if (priceInfo) {
        const { minPrice, maxPrice } = priceInfo;

        if (maxPrice > minPrice) {
            return (
                <>
                    <p className={cn("text-sm text-secondary/70")}>
                        Pricing varies
                    </p>
                    <p className={cn("font-semibold", "text-lg")}>
                        {`$${minPrice} to $${maxPrice}`}
                    </p>
                </>
            );
        }
    }

    return null;
};

export default PriceVariation;
