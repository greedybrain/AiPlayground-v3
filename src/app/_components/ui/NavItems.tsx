"use client";

import type { INavItem } from "@/types";
import NavItem from "./NavItem";
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
        name: "Admin",
        path: "/admin",
    },
    {
        name: "Logout",
        path: "/",
    },
] as INavItem[];

const NavItems = () => {
    return (
        <ul className={cn("gap-10", "hidden", "mr-10", "md:flex")}>
            {items.map((item) => (
                <NavItem key={item.name} {...item} />
            ))}
        </ul>
    );
};

export default NavItems;
