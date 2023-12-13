"use client";

import AiToolList from "./AiToolList";
import React from "react";
import useToolsByTagFetcher from "@/hooks/useToolsByTagFetcher";

const AiToolsByTagPageContent = () => {
    useToolsByTagFetcher();

    return (
        <>
            <AiToolList />
        </>
    );
};

export default AiToolsByTagPageContent;
