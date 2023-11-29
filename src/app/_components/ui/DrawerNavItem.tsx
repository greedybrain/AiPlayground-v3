import { signOut, useSession } from "next-auth/react";

import type { IDrawerNavItem } from "@/types";
import Link from "next/link";
import React from "react";
import cn from "@/utils/twMerge";
import usePopupStore from "@/store/slices/popup";

const authButtonStyles = cn(
    "border-2 border-secondary bg-primary",
    "p-3",
    "rounded-md",
    "shadow-neobrut1",
    "text-center text-secondary",
    "w-[200px]",
);

const DrawerNavItem = ({ name, path }: IDrawerNavItem) => {
    const { openSignInPopup, closeDrawerNav } = usePopupStore((state) => state);
    const { data: session } = useSession();

    const isSignedIn = !!session;
    const isAuthAction = name === "Sign in" || name === "Logout";
    const shouldHideItem =
        (name === "Sign in" && isSignedIn) ||
        (name === "Favorites" && !isSignedIn) ||
        (name === "Logout" && !isSignedIn);

    const handleClick = () => {
        if (name === "Logout") void signOut();
        if (name === "Sign in") openSignInPopup();
        closeDrawerNav();
    };

    if (shouldHideItem) return null;

    const renderLinkOrText = () => {
        return path ? <Link href={path}>{name}</Link> : name;
    };

    return (
        <li
            className={cn("cursor-pointer font-medium text-lg", {
                [authButtonStyles]: isAuthAction,
            })}
            onClick={handleClick}
        >
            {renderLinkOrText()}
        </li>
    );
};

export default DrawerNavItem;
