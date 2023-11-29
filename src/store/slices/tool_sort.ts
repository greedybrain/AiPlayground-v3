import type { IToolSortStoreState } from "@/types";
import { create } from "zustand";

const useToolSortStore = create<IToolSortStoreState>((set) => ({
    selectedCriterion: "Newly Added",
    selectedRange: "Any price",
    tagsSelected: {},
    ranges: {
        "Any price": "all",
        "Under $25": "under25",
        "$25 to $75": "25to75",
        "$75 to $100": "75to100",
        "Over $100": "over100",
    },
    criterions: {
        "Newly Added": ["date", "desc"],
        Oldest: ["date", "asc"],
        "Tool Name A-Z": ["name", "asc"],
        "Tool Name Z-A": ["name", "desc"],
        "Company A-Z": ["company", "asc"],
        "Company Z-A": ["company", "desc"],
        "Highest Price": ["price", "desc"],
        "Lowest Price": ["price", "asc"],
    },

    setTagsSelected: (tagsSelected) =>
        set((state) => {
            return {
                ...state,
                tagsSelected,
            };
        }),

    setSelectedCriterion: (selectedCriterion) =>
        set((state) => ({ ...state, selectedCriterion })),

    clearCriterionSelection: () =>
        set((state) => ({ ...state, selectedCriterion: "Newly Added" })),

    addSelectedTag: (tagSelected) =>
        set((state) => {
            return {
                ...state,
                tagsSelected: {
                    ...state.tagsSelected,
                    ...tagSelected,
                },
            };
        }),

    removeSelectedTag: (tagSelected) =>
        set((state) => {
            const [key] = Object.keys(tagSelected);

            const { [key]: _, ...refreshedSelection } = state.tagsSelected;

            return {
                ...state,
                tagsSelected: refreshedSelection,
            };
        }),

    setSelectedRange: (selectedRange) =>
        set((state) => ({ ...state, selectedRange })),

    clearRangeSelection: () =>
        set((state) => ({ ...state, selectedRange: "Any price" })),

    resetSortAndFilter: () =>
        set({
            tagsSelected: {},
            selectedCriterion: "Newly Added",
            selectedRange: "Any price",
        }),
}));

export default useToolSortStore;
