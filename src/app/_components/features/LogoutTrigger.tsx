"use client";

import { signOut, useSession } from "next-auth/react";

import { MdOutlineLogout } from "react-icons/md";
import React from "react";
import Wrapper from "../ui/Wrapper";
import cn from "@/utils/twMerge";

const LogoutTrigger = () => {
    const { status } = useSession();

    if (status === "loading" || status === "unauthenticated") return null;

    return (
        <div
            className={cn(
                "bg-secondary rounded-lg p-4 text-white cursor-pointer select-none",
            )}
            onClick={() => void signOut()}
        >
            <Wrapper className={cn(`flex items-center gap-2`)}>
                <p className={cn(`font-medium`)}>Log out</p>
                <MdOutlineLogout size={20} />
            </Wrapper>
        </div>
    );
};

export default LogoutTrigger;
