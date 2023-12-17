"use client";

import type { IClientLayout } from "@/types";
import React from "react";
import useInitialToolsFetcher from "@/hooks/useInitialToolsFetcher";
import useToolsUrlSortParamsLoader from "@/hooks/useToolsUrlSortParamsLoader";

const ClientLayout = ({ children, ...rest }: IClientLayout) => {
    useInitialToolsFetcher();
    useToolsUrlSortParamsLoader();

    return <div {...rest}>{children}</div>;
};

export default ClientLayout;
