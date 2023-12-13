"use client";

import AiToolList from "./AiToolList";
import React from "react";
import ToolInDetail from "../features/aiTool/ToolInDetail";
import Wrapper from "./Wrapper";
import cn from "@/utils/twMerge";
import useToolsByRelationFetcher from "@/hooks/useToolsByRelationFetcher";

const AiToolDetailPageContent = () => {
    useToolsByRelationFetcher();

    return (
        <>
            <ToolInDetail />
            <Wrapper className={cn("mt-20")}>
                <AiToolList />
            </Wrapper>
        </>
    );
};

export default AiToolDetailPageContent;
