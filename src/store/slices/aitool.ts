import type { AiToolWithRelations, IAiToolStoreState } from "@/types";

import { create } from "zustand";

const useAiToolStore = create<IAiToolStoreState>((set) => ({
    aiToolsByQueryDictionary: {},
    aiToolsByRelationDictionary: {},
    aiToolsByTagDictionary: {},
    aiToolsDictionary: {},
    aiToolsSortedAndFilteredDictionary: {},
    currentVideoSource: "",
    cursor: "",
    initiallyLoaded: false,
    loadingSortAndFilteredTools: false,
    loadingTools: true,
    loadingToolsByQuery: false,
    loadingToolsByRelation: false,
    loadingToolsByTag: false,
    sortAndFilterCursor: "",
    sortAndFilterInitiallyLoaded: false,
    tagsGeneratedByQuery: [],
    toolAtGlance: {} as AiToolWithRelations,
    toolsByQueryCursor: "",
    toolsByQueryInitiallyLoaded: false,
    toolsByRelationCursor: "",
    toolsByRelationInitiallyLoaded: false,
    toolsByTagCursor: "",
    toolsByTagInitiallyLoaded: false,
    totalDefaultToolsCount: 0,
    totalSortAndFilterCount: 0,
    totalToolsByQueryCount: 0,
    totalToolsByTagCount: 0,

    setAiToolsDictionary: (aiTools) =>
        set((state) => {
            const aiToolsDictionary = Array.isArray(aiTools)
                ? convertToolsArrayToDict(aiTools)
                : aiTools;

            return {
                ...state,
                aiToolsDictionary,
            };
        }),

    addAiToolsToDictionary: (aiTools) =>
        set((state) => {
            const additionalToolItems = convertToolsArrayToDict(aiTools);

            return {
                ...state,
                aiToolsDictionary: {
                    ...state.aiToolsDictionary,
                    ...additionalToolItems,
                },
            };
        }),

    setAiToolsSortedAndFilteredDictionary: (aiTools) =>
        set((state) => {
            const aiToolsSortedAndFilteredDictionary =
                convertToolsArrayToDict(aiTools);

            return {
                ...state,
                aiToolsSortedAndFilteredDictionary,
            };
        }),

    setAiToolsByQueryDictionary: (aiTools) =>
        set((state) => {
            const aiToolsByQueryDictionary = convertToolsArrayToDict(aiTools);

            return {
                ...state,
                aiToolsByQueryDictionary,
            };
        }),

    addAiToolsToSortedAndFilteredDictionary: (aiTools) =>
        set((state) => {
            const additionalToolItems = convertToolsArrayToDict(aiTools);

            return {
                ...state,
                aiToolsSortedAndFilteredDictionary: {
                    ...state.aiToolsSortedAndFilteredDictionary,
                    ...additionalToolItems,
                },
            };
        }),

    setVideoSource: (src) =>
        set((state) => ({ ...state, currentVideoSource: src })),

    setCursor: (cursor) => set((state) => ({ ...state, cursor })),

    setSortAndFitlerCursor: (sortAndFilterCursor) =>
        set((state) => ({ ...state, sortAndFilterCursor })),

    setLoadingTools: (isLoading) => set(() => ({ loadingTools: isLoading })),

    setLoadingSortAndFilteredTools: (isLoading) =>
        set(() => ({ loadingSortAndFilteredTools: isLoading })),

    setTotalSortAndFilterCount: (totalSortAndFilterCount) =>
        set((state) => ({ ...state, totalSortAndFilterCount })),

    setInitiallyLoaded: (initiallyLoaded) =>
        set((state) => ({ ...state, initiallyLoaded })),

    setSortAndFilterInitiallyLoaded: (sortAndFilterInitiallyLoaded) =>
        set((state) => ({ ...state, sortAndFilterInitiallyLoaded })),

    setToolsByTagInitiallyLoaded: (sortAndFilterInitiallyLoaded) =>
        set((state) => ({ ...state, sortAndFilterInitiallyLoaded })),

    setLoadingToolsByTag: (loadingToolsByTag) =>
        set((state) => ({ ...state, loadingToolsByTag })),

    setAiToolsByTagDictionary: (aiTools) =>
        set((state) => {
            const aiToolsByTagDictionary = convertToolsArrayToDict(aiTools);

            return {
                ...state,
                aiToolsByTagDictionary,
            };
        }),

    setTotalToolsByTagCount: (totalToolsByTagCount) =>
        set((state) => ({ ...state, totalToolsByTagCount })),

    setToolsByTagCursor: (toolsByTagCursor) =>
        set((state) => ({ ...state, toolsByTagCursor })),

    addAiToolsByTagToDictionary: (aiTools) =>
        set((state) => {
            const additionalToolItems = convertToolsArrayToDict(aiTools);

            return {
                ...state,
                aiToolsByTagDictionary: {
                    ...state.aiToolsByTagDictionary,
                    ...additionalToolItems,
                },
            };
        }),

    addAiToolsToToolsByQueryDictionary: (aiTools) =>
        set((state) => {
            const additionalToolItems = convertToolsArrayToDict(aiTools);

            return {
                ...state,
                aiToolsByQueryDictionary: {
                    ...state.aiToolsByQueryDictionary,
                    ...additionalToolItems,
                },
            };
        }),

    setToolAtGlance: (toolAtGlance) =>
        set((state) => ({
            ...state,
            toolAtGlance,
        })),

    setToolsByQueryCursor: (toolsByQueryCursor) =>
        set((state) => ({ ...state, toolsByQueryCursor })),

    setLoadingToolsByQuery: (loadingToolsByQuery) =>
        set((state) => ({ ...state, loadingToolsByQuery })),

    setTagsGeneratedByQuery: (tagsGeneratedByQuery) =>
        set((state) => ({ ...state, tagsGeneratedByQuery })),

    setToolsByQueryInitiallyLoaded: (toolsByQueryInitiallyLoaded) =>
        set((state) => ({ ...state, toolsByQueryInitiallyLoaded })),

    setTotalToolsByQueryCount: (totalToolsByQueryCount) =>
        set((state) => ({ ...state, totalToolsByQueryCount })),

    addAiToolsToToolsByRelationDictionary: (aiTools) =>
        set((state) => {
            const additionalToolItems = convertToolsArrayToDict(aiTools);

            return {
                ...state,
                aiToolsByRelationDictionary: {
                    ...state.aiToolsByRelationDictionary,
                    ...additionalToolItems,
                },
            };
        }),
    setAiToolsByRelationDictionary: (aiTools) =>
        set((state) => {
            const aiToolsByRelationDictionary =
                convertToolsArrayToDict(aiTools);

            return {
                ...state,
                aiToolsByRelationDictionary,
            };
        }),
    setLoadingToolsByRelation: (loadingToolsByRelation) =>
        set((state) => ({ ...state, loadingToolsByRelation })),

    setToolsByRelationInitiallyLoaded: (toolsByRelationInitiallyLoaded) =>
        set((state) => ({ ...state, toolsByRelationInitiallyLoaded })),

    setToolsByRelationCursor: (toolsByRelationCursor) =>
        set((state) => ({ ...state, toolsByRelationCursor })),

    setDefaultTotalToolsCount: (totalDefaultToolsCount) =>
        set((state) => ({ ...state, totalDefaultToolsCount })),
}));

export default useAiToolStore;

// Helpers
const convertToolsArrayToDict = (aiTools: AiToolWithRelations[]) => {
    const aiToolsDictionary: IAiToolStoreState["aiToolsDictionary"] = {};

    for (const tool of aiTools) {
        aiToolsDictionary[tool.nameLowercase] = tool;
    }

    return aiToolsDictionary;
};
