import DrawerNavItem from "./DrawerNavItem";
import type { IDrawerNavItem } from "@/types";
import React from "react";
import cn from "@/utils/twMerge";

const items = [
    {
        name: "Home",
        path: "/",
    },
    {
        name: "Favorites",
        path: "/user/favorites",
    },
    {
        name: "Privacy policy",
        path: "/privacy",
    },
    {
        name: "Sign in",
        path: null,
    },
    {
        name: "Logout",
        path: "/",
    },
] as IDrawerNavItem[];

const DrawerNavItems = () => {
    return (
        <ul className={cn("flex flex-col", "gap-8", "items-center", "mt-10")}>
            {items.map((item) => (
                <DrawerNavItem key={item.name} {...item} />
            ))}
        </ul>
    );
};

export default DrawerNavItems;
