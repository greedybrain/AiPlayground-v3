import type { HTMLAttributes } from "react";
import type { IconType } from "react-icons";
import type { ImageProps } from "next/image";
import type { LottieProps } from "react-lottie";
import { Prisma } from "@prisma/client";

//Types

export type AddFavoriteProps = {
    tool: AiToolWithRelations;
    setFavCount: React.Dispatch<React.SetStateAction<number>>;
    setIsFavorited: React.Dispatch<React.SetStateAction<boolean>>;
};

export const aiToolWithPriceInfo = Prisma.validator<Prisma.AiToolDefaultArgs>()(
    {
        include: {
            PriceInfo: { include: { PriceAmounts: true, PriceRanges: true } },
            Tags: {
                include: {
                    AiTools: {
                        select: {
                            id: true,
                            name: true,
                            nameLowercase: true,
                        },
                    },
                },
            },
            KeyTakeaways: true,
            FavoritedBy: { include: { User: true } },
        },
    },
);
// ================================

export interface IAiToolStoreState {
    aiToolsDictionary: Record<string, AiToolWithRelations>;
    aiToolsSortedAndFilteredDictionary: Record<string, AiToolWithRelations>;
    aiToolsByTagDictionary: Record<string, AiToolWithRelations>;
    toolAtGlance: AiToolWithRelations;
    currentVideoSource: string;
    cursor: string;
    sortAndFilterCursor: string;
    toolsByTagCursor: string;
    loadingTools: boolean;
    loadingSortAndFilteredTools: boolean;
    loadingToolsByTag: boolean;
    totalSortAndFilterCount: number;
    totalToolsByTagCount: number;
    sortAndFilterInitiallyLoaded: boolean;
    initiallyLoaded: boolean;
    toolsByTagInitiallyLoaded: boolean;

    setAiToolsDictionary: (
        aiTools: AiToolWithRelations[] | Record<string, AiToolWithRelations>,
    ) => void;
    addAiToolsToDictionary: (aiTools: AiToolWithRelations[]) => void;
    setAiToolsSortedAndFilteredDictionary: (
        aiTools: AiToolWithRelations[],
    ) => void;
    addAiToolsToSortedAndFilteredDictionary: (
        aiTools: AiToolWithRelations[],
    ) => void;
    addAiToolsByTagToDictionary: (aiTools: AiToolWithRelations[]) => void;
    setAiToolsByTagDictionary: (aiTools: AiToolWithRelations[]) => void;
    setVideoSource: (src: string) => void;
    setCursor: (cursor: string) => void;
    setSortAndFitlerCursor: (cursor: string) => void;
    setLoadingTools: (isLoading: boolean) => void;
    setLoadingSortAndFilteredTools: (isLoading: boolean) => void;
    setTotalSortAndFilterCount: (count: number) => void;
    setSortAndFilterInitiallyLoaded: (
        sortAndFilterInitiallyLoaded: boolean,
    ) => void;
    setInitiallyLoaded: (initiallyLoaded: boolean) => void;
    setToolsByTagInitiallyLoaded: (initiallyLoaded: boolean) => void;
    setLoadingToolsByTag: (isLoading: boolean) => void;
    setTotalToolsByTagCount: (count: number) => void;
    setToolsByTagCursor: (cursor: string) => void;
    setToolAtGlance: (tool: AiToolWithRelations) => void;
}

export type AiToolWithRelations = Prisma.AiToolGetPayload<
    typeof aiToolWithPriceInfo
>;

export type BookmarkHandlerProps = {
    tool: AiToolWithRelations;
    isFavorited: boolean;
    setFavCount: React.Dispatch<React.SetStateAction<number>>;
    setIsFavorited: React.Dispatch<React.SetStateAction<boolean>>;
};

export interface IClientLayout extends IWrapper {}

export type CompanyLogoProps = {
    logoUrl: AiToolWithRelations["logoUrl"];
    companyName: string;
};

export type CompanyNameProps = {
    companyName: string;
};

export interface ICustomImage
    extends Omit<ImageProps, "alt" | "src" | "width" | "height"> {
    wrapperWidth?: number;
    wrapperHeight?: number;
}

export type DescriptionProps = {
    name: string;
    text: string;
};

export interface IDrawerNavItem {
    name: "Home" | "Privacy policy" | "Sign in" | "Logout" | "Favorites";
    path?: "/" | "/privacy" | "/user/favorites" | null;
}

export interface IExistingAccountHandler
    extends HTMLAttributes<HTMLDivElement>,
        ExistOrNonExistAccount {}

export type ExistOrNonExistAccount = {
    authMode: "login" | "signup";
    setAuthMode: React.Dispatch<React.SetStateAction<"login" | "signup">>;
    clearCredentials: () => void;
};

export type FavCountProps = {
    count: number;
};

export interface IFavoritesStoreState {
    favoritesDictionary: Record<string, AiToolWithRelations>;
    favoritesCursor: string;
    loadingFavorites: boolean;
    favoritesTotalCount: number;
    favoritesInitiallyLoaded: boolean;

    setFavoritesDictionary: (
        favoritesDictionary: AiToolWithRelations[],
    ) => void;
    setFavoritesCursor: (favoritesCursor: string) => void;
    setLoadingFavorites: (loadingFavorites: boolean) => void;
    addBatchToolsToFavoritesDictionary: (
        favorites: AiToolWithRelations[],
    ) => void;
    addToolToFavorites: (favorite: AiToolWithRelations) => void;
    removeToolFromFavorites: (favorite: AiToolWithRelations) => void;
    setFavoritesTotalCount: (total: number) => void;
    setFavoritesInitiallyLoaded: (favoritesInitiallyLoaded: boolean) => void;
}

export interface IFieldIcon {
    Icon: IconType;
    wrapperWidth: number | string;
    wrapperHeight: number | string;
    color: string;
    size: number;
    left?: boolean;
    right?: boolean;
}

export interface IHighlightContent {
    id: number;
    content: "EXPANSIVE AI DIRECTORY" | never;
    extra: "AI UNLEASHED" | never;
}

export interface ILogoName extends HTMLAttributes<HTMLParagraphElement> {}

export interface ILottieProps extends Omit<LottieProps, "options"> {}

export type NameProps = {
    text: string;
};

export interface INavItem {
    name: "Home" | "Favorites" | "Logout";
    path: "/" | "/user/favorites";
}

export interface INoAccountHandler
    extends HTMLAttributes<HTMLDivElement>,
        ExistOrNonExistAccount {}

export interface IOAuthOption {
    id: number;
    method: "Google" | "Facebook" | "Discord" | "Reddit" | "Github" | "Twitter";
    label: string;
    path?: string;
    Icon: IconType;
    _classNames?: string;
    iconSize?: number;
    color: string;
    authenticate: () => void;
}

export type PlayButtonProps = {
    src: string;
};

export interface IPopupStoreState {
    signInPopupIsOpen: boolean;
    drawerNavIsOpen: boolean;
    sortAndFilterOpen: boolean;

    openSignInPopup: () => void;
    openDrawerNav: () => void;
    closeSignInPopup: () => void;
    closeDrawerNav: () => void;
    openSortAndFilter: () => void;
    closeSortAndFilter: () => void;
}

export type PriceRangeOptionsType =
    | "Any price"
    | "Under $25"
    | "$25 to $75"
    | "$75 to $100"
    | "Over $100";

export type SortCriterionOptionsType =
    | "Newly Added"
    | "Oldest"
    | "Tool Name A-Z"
    | "Tool Name Z-A"
    | "Company A-Z"
    | "Company Z-A"
    | "Lowest Price"
    | "Highest Price";

export type RemoveFavoriteProps = AddFavoriteProps;

export interface ITaglinePrimary extends HTMLAttributes<HTMLParagraphElement> {
    abbrevStyles?: string;
}

export interface ITaglineSecondary
    extends HTMLAttributes<HTMLParagraphElement> {}

export interface ITagsStoreState {
    tagsDictionary: Record<string, AiToolWithRelations["Tags"][0]>;
    loadingTags: boolean;

    setTags: (tags: AiToolWithRelations["Tags"]) => void;
    setLoadingTags: (loadingTags: boolean) => void;
}

export type TagsProps = {
    tags: AiToolWithRelations["Tags"];
};

export interface IToolSortStoreState {
    criterions: Record<SortCriterionOptionsType, [string, string]>;
    selectedCriterion: SortCriterionOptionsType;
    tagsSelected: Record<string, AiToolWithRelations["Tags"][0]>;
    ranges: Record<PriceRangeOptionsType, string>;
    selectedRange: PriceRangeOptionsType;

    setTagsSelected: (
        tagsSelected: Record<string, AiToolWithRelations["Tags"][0]>,
    ) => void;
    setSelectedRange: (selectedRange: PriceRangeOptionsType) => void;
    clearRangeSelection: () => void;
    setSelectedCriterion: (selectedCriterion: SortCriterionOptionsType) => void;
    clearCriterionSelection: () => void;
    addSelectedTag: (
        tagSelected: Record<string, AiToolWithRelations["Tags"][0]>,
    ) => void;
    removeSelectedTag: (
        tagSelected: Record<string, AiToolWithRelations["Tags"][0]>,
    ) => void;
    resetSortAndFilter: () => void;
}

export type WebsiteScreenshotProps = {
    screenshotUrl: string;
    name: string;
};

export interface IWrapper extends HTMLAttributes<HTMLDivElement> {}
