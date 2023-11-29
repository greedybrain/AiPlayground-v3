import type { AiToolWithRelations, IFavoritesStoreState } from "@/types";

import { create } from "zustand";

const useFavoritesStore = create<IFavoritesStoreState>((set) => ({
    favoritesDictionary: {},
    favoritesCursor: "",
    loadingFavorites: false,
    favoritesTotalCount: 0,
    favoritesInitiallyLoaded: false,

    setLoadingFavorites: (loadingFavorites) =>
        set((state) => ({ ...state, loadingFavorites })),

    setFavoritesDictionary: (favorites) =>
        set((state) => {
            const favoritesDictionary = convertFavoritesArrayToDict(favorites);

            return {
                ...state,
                favoritesDictionary,
            };
        }),

    setFavoritesTotalCount: (total) =>
        set((state) => ({ ...state, favoritesTotalCount: total })),

    setFavoritesCursor: (favoritesCursor) =>
        set((state) => ({ ...state, favoritesCursor })),

    addBatchToolsToFavoritesDictionary: (favorites) =>
        set((state) => {
            const additonalFavorites = convertFavoritesArrayToDict(favorites);

            return {
                ...state,
                favoritesDictionary: {
                    ...state.favoritesDictionary,
                    ...additonalFavorites,
                },
            };
        }),

    addToolToFavorites: (favorite) =>
        set((state) => {
            const newFavoriteRecord = { [favorite.nameLowercase]: favorite };

            return {
                ...state,
                favoritesDictionary: {
                    ...newFavoriteRecord,
                    ...state.favoritesDictionary,
                },
            };
        }),

    removeToolFromFavorites: (favorite) =>
        set((state) => {
            const {
                [favorite.nameLowercase]: _,
                ...refreshedFavoritesDictionary
            } = state.favoritesDictionary;

            return {
                ...state,
                favoritesDictionary: refreshedFavoritesDictionary,
            };
        }),

    setFavoritesInitiallyLoaded: (favoritesInitiallyLoaded) =>
        set((state) => ({
            ...state,
            favoritesInitiallyLoaded,
        })),
}));

export default useFavoritesStore;

// Helpers
const convertFavoritesArrayToDict = (favorites: AiToolWithRelations[]) => {
    const favoritesDictionary: IFavoritesStoreState["favoritesDictionary"] = {};

    for (const favorite of favorites) {
        favoritesDictionary[favorite.nameLowercase] = favorite;
    }

    return favoritesDictionary;
};
