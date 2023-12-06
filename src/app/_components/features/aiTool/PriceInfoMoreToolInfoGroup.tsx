import type { AiToolWithRelations } from "@/types";
import MoreToolInfoLink from "./MoreToolInfoLink";
import PriceInfo from "./PriceInfo";
import React from "react";
import Wrapper from "../../ui/Wrapper";
import cn from "@/utils/twMerge";

const PriceInfoMoreToolInfoGroup = ({
    tool,
    index,
}: {
    tool: AiToolWithRelations;
    index: number;
}) => {
    return (
        <Wrapper
            className={cn(
                "flex",
                "items-center",
                "justify-between",
                "mt-8",
                "px-3",
            )}
        >
            <PriceInfo tool={tool} />
            <MoreToolInfoLink tool={tool} index={index} />
        </Wrapper>
    );
};

export default PriceInfoMoreToolInfoGroup;
