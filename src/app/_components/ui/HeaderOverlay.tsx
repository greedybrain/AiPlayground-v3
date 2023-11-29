"use client";

import React from "react";
import cn from "@/utils/twMerge";
import useModalStore from "@/store/slices/popup";

const HeaderOverlay = () => {
    const { signInPopupIsOpen } = useModalStore((state) => state);

    if (!signInPopupIsOpen) return null;

    return (
        <div
            className={cn("absolute top-0 bg-transparent w-full h-[100px] ")}
        />
    );
};

export default HeaderOverlay;
