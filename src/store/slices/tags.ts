import type { AiToolWithRelations, ITagsStoreState } from "@/types";

import { create } from "zustand";

const useTagsStore = create<ITagsStoreState>((set) => ({
    tagsDictionary: {},
    loadingTags: true,

    setTags: (tags) =>
        set((state) => {
            const tagsDictionary = convertTagsArrayToDict(tags);

            return {
                ...state,
                tagsDictionary,
            };
        }),

    setLoadingTags: (loadingTags) =>
        set((state) => ({ ...state, loadingTags })),
}));

export default useTagsStore;

// Helpers

const convertTagsArrayToDict = (tags: AiToolWithRelations["Tags"]) => {
    const tagsDictionary: ITagsStoreState["tagsDictionary"] = {};

    for (const tag of tags) {
        tagsDictionary[tag.tagName.toLocaleLowerCase()] = tag;
    }

    return tagsDictionary;
};
