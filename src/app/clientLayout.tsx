"use client";

import React, { useEffect } from "react";

import type { IClientLayout } from "@/types";
import useInitialToolsFetcher from "@/hooks/useInitialToolsFetcher";
import useToolsUrlSortParamsLoader from "@/hooks/useToolsUrlSortParamsLoader";

const ClientLayout = ({ children, ...rest }: IClientLayout) => {
    useInitialToolsFetcher();
    useToolsUrlSortParamsLoader();

    useEffect(() => {
        fetch("/api/whois")
            .then((res) => res.json())
            .then((data) => data)
            .catch((err) => console.log("Error: ", err));
    }, []);

    return <div {...rest}>{children}</div>;
};

export default ClientLayout;
