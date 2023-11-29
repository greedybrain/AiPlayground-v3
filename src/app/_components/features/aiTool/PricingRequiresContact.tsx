import type { AiToolWithRelations } from "@/types";
import React from "react";
import cn from "@/utils/twMerge";

const PricingRequiresContact = ({
    priceInfo,
    name,
}: {
    priceInfo: AiToolWithRelations["PriceInfo"];
    name: AiToolWithRelations["name"];
}) => {
    if (priceInfo) {
        const { minPrice, maxPrice } = priceInfo;

        if (minPrice === maxPrice && maxPrice === -1) {
            return (
                <>
                    <p className={cn("text-sm text-secondary/70")}>
                        For pricing contact
                    </p>
                    <p className={cn("font-semibold", "text-lg")}>{name}</p>
                </>
            );
        }
    }

    return null;
};

export default PricingRequiresContact;
