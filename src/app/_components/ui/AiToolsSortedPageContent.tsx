"use client";

import AiToolList from "./AiToolList";
import React from "react";
import useToolsSortAndFilter from "@/hooks/useToolsSortAndFilter";

const AiToolsSortedPageContent = () => {
    useToolsSortAndFilter();

    return (
        <>
            <AiToolList />
        </>
    );
};

export default AiToolsSortedPageContent;
