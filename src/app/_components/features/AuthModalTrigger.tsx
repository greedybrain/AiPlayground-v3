"use client";

import { PiCaretDownBold, PiCaretUpBold } from "react-icons/pi";

import React from "react";
import Wrapper from "../ui/Wrapper";
import cn from "@/utils/twMerge";
import useModalStore from "@/store/slices/popup";
import { useSession } from "next-auth/react";

/**
 * Responsibility - Triggers modal to open up displaying sign in options
 * Resusable - N/A
 * Any similar components - No
 */

const AuthModalTrigger = () => {
    const { openSignInPopup, signInPopupIsOpen } = useModalStore(
        (state) => state,
    );
    const { status } = useSession();

    if (status === "authenticated") return null;

    return (
        <div
            className={cn(
                "bg-secondary rounded-lg p-4 text-white cursor-pointer select-none",
            )}
            onClick={openSignInPopup}
        >
            <Wrapper className={cn(`flex items-center gap-2`)}>
                <p className={cn(`font-medium`, "text-white")}>Sign in</p>
                {signInPopupIsOpen ? (
                    <PiCaretUpBold fill="#FFFFFF" />
                ) : (
                    <PiCaretDownBold fill="#FFFFFF" />
                )}
            </Wrapper>
        </div>
    );
};

export default AuthModalTrigger;
