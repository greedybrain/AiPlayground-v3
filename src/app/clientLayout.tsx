"use client";

import type { IClientLayout } from "@/types";
import React from "react";
// import useAiToolStore from "@/store/slices/aitool";
import useInitialToolsFetcher from "@/hooks/useInitialToolsFetcher";
import useToolsByQueryFetcher from "@/hooks/useToolsByQueryFetcher";
import useToolsByRelationFetcher from "@/hooks/useToolsByRelationFetcher";
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
    useToolsByQueryFetcher();
    useToolsByRelationFetcher();

    // const { totalDefaultToolsCount } = useAiToolStore((state) => state);
    // console.log(totalDefaultToolsCount);

    return <div {...rest}>{children}</div>;
};

export default ClientLayout;
