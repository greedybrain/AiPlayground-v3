import type { AiToolWithRelations } from "@/types";
import FixedPrice from "./FixedPrice";
import FreeToUse from "./FreeToUse";
import PriceVariation from "./PriceVariation";
import PricingRequiresContact from "./PricingRequiresContact";
import React from "react";
import Wrapper from "../../ui/Wrapper";

const PriceInfo = ({ tool }: { tool: AiToolWithRelations }) => {
    return (
        <Wrapper>
            <FreeToUse priceInfo={tool.PriceInfo} />
            <PricingRequiresContact
                priceInfo={tool.PriceInfo}
                name={tool.name}
            />
            <FixedPrice priceInfo={tool.PriceInfo} name={tool.name} />
            <PriceVariation priceInfo={tool.PriceInfo} />
        </Wrapper>
    );
};

export default PriceInfo;
