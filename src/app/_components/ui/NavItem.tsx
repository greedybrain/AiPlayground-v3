import { signOut, useSession } from "next-auth/react";

import type { INavItem } from "@/types";
import Link from "next/link";
import React from "react";
import cn from "@/utils/twMerge";

const NavItem = (item: INavItem) => {
    const { data: session } = useSession();

    const shouldHideItem =
        (!session &&
            ["Favorites", "Logout"].some((val) => val === item.name)) ||
        (item.name === "Admin" && !session?.user.isAdmin);

    const renderItem = () => {
        if (shouldHideItem) {
            return null;
        }

        return <Link href={item.path}>{item.name}</Link>;
    };

    return (
        <li
            key={item.name}
            className={cn("cursor-pointer", "font-medium", "text-lg", {
                hidden: shouldHideItem,
            })}
            onClick={() => {
                if (item.name === "Logout") {
                    void signOut();
                }
            }}
        >
            {renderItem()}
        </li>
    );
};

export default NavItem;
