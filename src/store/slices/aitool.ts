import type { AiToolWithRelations, IAiToolStoreState } from "@/types";

import { create } from "zustand";

const useAiToolStore = create<IAiToolStoreState>((set) => ({
    aiToolsDictionary: {},
    aiToolsSortedAndFilteredDictionary: {},
    aiToolsByTagDictionary: {},
    currentVideoSource: "",
    cursor: "",
    sortAndFilterCursor: "",
    toolsByTagCursor: "",
    loadingTools: true,
    loadingSortAndFilteredTools: false,
    loadingToolsByTag: false,
    totalSortAndFilterCount: 0,
    totalToolsByTagCount: 0,
    initiallyLoaded: false,
    sortAndFilterInitiallyLoaded: false,
    toolsByTagInitiallyLoaded: false,

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
    // this
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
