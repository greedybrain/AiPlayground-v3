import type { IToolSortStoreState, SortCriterionOptionsType } from "@/types";
import { useCallback, useEffect, useMemo } from "react";

import { useSearchParams } from "next/navigation";
import useTagsStore from "@/store/slices/tags";
import useToolSortStore from "@/store/slices/tool_sort";

const useToolsUrlSortParamsLoader = () => {
    const searchParams = useSearchParams();
    const tagsDictionary = useTagsStore((state) => state.tagsDictionary);

    const {
        criterions,
        ranges,
        setSelectedRange,
        setSelectedCriterion,
        setTagsSelected,
    } = useToolSortStore((state) => state);

    const paramsRecord = useMemo(() => {
        let record: Record<string, string> = {};
        searchParams.forEach((value, key) => {
            record[key] = value;
        });

        return record;
    }, [searchParams]);

    const handleLoadTagsFromUrl = useCallback(() => {
        const tagsAsString = paramsRecord["tags"];

        if (tagsAsString) {
            const tagsToLoad: IToolSortStoreState["tagsSelected"] = {};
            const tags = tagsAsString.split(",");

            for (const tag of tags) {
                tagsToLoad[tag] = tagsDictionary[tag];
            }

            setTagsSelected(tagsToLoad);
        }
    }, [paramsRecord, setTagsSelected, tagsDictionary]);

    const handleLoadPriceRangeFromUrl = useCallback(() => {
        const priceRange = paramsRecord["price_range"];

        if (priceRange) {
            const range = Object.entries(ranges).find(
                ([_, value]) => value === priceRange,
            )?.[0];

            if (range) {
                setSelectedRange(range as keyof IToolSortStoreState["ranges"]);
            }
        }
    }, [paramsRecord, ranges, setSelectedRange]);

    const handleLoadSortAndOrderFromUrl = useCallback(() => {
        const sortParam = paramsRecord["sort"];
        const orderParam = paramsRecord["order"];

        if (sortParam && orderParam) {
            const criterion = Object.entries(criterions).find(
                ([_, [innerKey, innerVal]]) =>
                    innerKey === sortParam && innerVal === orderParam,
            )?.[0];

            criterion &&
                setSelectedCriterion(criterion as SortCriterionOptionsType);
        }
    }, [criterions, paramsRecord, setSelectedCriterion]);

    useEffect(() => {
        if (paramsRecord["price_range"]) {
            handleLoadTagsFromUrl();
            handleLoadPriceRangeFromUrl();
            handleLoadSortAndOrderFromUrl();
        }
    }, [
        handleLoadTagsFromUrl,
        handleLoadPriceRangeFromUrl,
        handleLoadSortAndOrderFromUrl,
        paramsRecord,
    ]);
};

export default useToolsUrlSortParamsLoader;
