"use client";

import React, { useRef } from "react";

import BrandLogo from "./BrandLogo";
import DrawerNavItems from "./DrawerNavItems";
import { MdOutlineClose } from "react-icons/md";
import Wrapper from "./Wrapper";
import cn from "@/utils/twMerge";
import useDetectOutsideClick from "@/hooks/useDetectOutsideClick";
import usePopupStore from "@/store/slices/popup";
import { useRouter } from "next/navigation";

const DrawerNav = () => {
    const { push } = useRouter();

    const { closeDrawerNav, drawerNavIsOpen } = usePopupStore((state) => state);

    const menuWrapperRef = useRef<HTMLDivElement | null>(null);

    useDetectOutsideClick(menuWrapperRef);

    if (!drawerNavIsOpen) return null;

    return (
        <div
            className={cn(
                "bg-white border border-secondary/5",
                "fixed",
                "h-full",
                "shadow-2xl md:hidden",
                "top-0",
                "w-full",
                "z-30",
            )}
            ref={menuWrapperRef}
        >
            <Wrapper
                // className={cn("p-4 pr-6")}
                className={cn(
                    "flex",
                    "items-center",
                    "justify-between",
                    "mx-auto max-w-[1200px]",
                    "py-4",
                    "relative",
                    "w-11/12",
                )}
            >
                <BrandLogo
                    wrapperWidth={65}
                    wrapperHeight={65}
                    onClick={() => {
                        closeDrawerNav();

                        void push("/");
                    }}
                />
                <MdOutlineClose
                    className={cn("cursor-pointer")}
                    color="#2F2549"
                    size={24}
                    onClick={closeDrawerNav}
                />
            </Wrapper>
            <DrawerNavItems />
        </div>
    );
};

export default DrawerNav;
