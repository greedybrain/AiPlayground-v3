"use client";

import AiToolList from "./AiToolList";
import React from "react";
import useToolsByQueryFetcher from "@/hooks/useToolsByQueryFetcher";

const AiToolsFromSearchPageContent = () => {
    useToolsByQueryFetcher();

    return (
        <>
            <AiToolList />
        </>
    );
};

export default AiToolsFromSearchPageContent;
