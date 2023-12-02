"use client";

import type { IClientLayout } from "@/types";
import React from "react";
import useInitialToolsFetcher from "@/hooks/useInitialToolsFetcher";
import useToolsByTagFetcher from "@/hooks/useToolsByTagFetcher";
import useToolsSortAndFilter from "@/hooks/useToolsSortAndFilter";
import useToolsUrlSortParamsLoader from "@/hooks/useToolsUrlSortParamsLoader";
import useUserFavoriteToolsFetcher from "@/hooks/useUserFavoriteToolsFetcher";

const ClientLayout = ({ children, ...rest }: IClientLayout) => {
    useInitialToolsFetcher();
    useToolsSortAndFilter();
    useToolsUrlSortParamsLoader();
    useUserFavoriteToolsFetcher();
    useToolsByTagFetcher();

    return <div {...rest}>{children}</div>;
};

export default ClientLayout;
