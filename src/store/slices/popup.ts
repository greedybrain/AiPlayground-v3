import type { IPopupStoreState } from "@/types";
import { create } from "zustand";

const usePopupStore = create<IPopupStoreState>((set) => ({
    signInPopupIsOpen: false,
    drawerNavIsOpen: false,
    sortAndFilterOpen: false,

    openSignInPopup: () =>
        set((state) => ({ ...state, signInPopupIsOpen: true })),

    closeSignInPopup: () =>
        set((state) => ({ ...state, signInPopupIsOpen: false })),

    openDrawerNav: () => set((state) => ({ ...state, drawerNavIsOpen: true })),

    closeDrawerNav: () =>
        set((state) => ({ ...state, drawerNavIsOpen: false })),

    openSortAndFilter: () =>
        set((state) => {
            document.body.style.overflow = "hidden";
            return { ...state, sortAndFilterOpen: true };
        }),

    closeSortAndFilter: () =>
        set((state) => {
            document.body.style.overflow = "scroll";
            return { ...state, sortAndFilterOpen: false };
        }),
}));

export default usePopupStore;
