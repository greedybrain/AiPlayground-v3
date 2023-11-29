"use client";

import { HiOutlineMenuAlt4 } from "react-icons/hi";
import React from "react";
import cn from "@/utils/twMerge";
import usePopupStore from "@/store/slices/popup";

const MenuButton = () => {
    const openDrawerNav = usePopupStore((state) => state.openDrawerNav);

    return (
        <HiOutlineMenuAlt4
            className={cn("cursor-pointer", "md:hidden")}
            size={30}
            color="#2F2549"
            onClick={openDrawerNav}
        />
    );
};

export default MenuButton;
