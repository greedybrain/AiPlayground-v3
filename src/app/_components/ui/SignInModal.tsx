"use client";

import React, { useEffect, useRef } from "react";

import OAuthOptions from "./OAuthOptions";
// import Wrapper from "./Wrapper";
import cn from "@/utils/twMerge";
import { darkModeStyle } from "@/utils/darkModeToast";
import toast from "react-hot-toast";
import useDetectOutsideClick from "@/hooks/useDetectOutsideClick";
import useModalStore from "@/store/slices/popup";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";

/**
 * Responsibility - Displays sign in options
 * Resusable - N/A
 * Any similar components - No
 */

const SignInModal = () => {
    const { signInPopupIsOpen, openSignInPopup } = useModalStore(
        (state) => state,
    );

    const modalRef = useRef<HTMLDivElement>(null);
    useDetectOutsideClick(modalRef);

    const { data: session } = useSession();
    const searchParams = useSearchParams();
    const { replace } = useRouter();

    useEffect(() => {
        const paramInQuestion = "authRequired";
        if (searchParams.get(paramInQuestion)) {
            toast.error("You must be logged in to do that", {
                id: "authRequired",
                style: darkModeStyle,
            });

            setTimeout(() => {
                openSignInPopup();
            }, 1000);

            const url = new URL(window.location.href);
            url.searchParams.delete(paramInQuestion);

            replace(url.pathname + url.search);
        }
    }, [openSignInPopup, replace, searchParams]);

    if (!signInPopupIsOpen || session) return null;

    const lastUsedOAuthProvider = localStorage.getItem("lastUsedOAuthProvider");

    return (
        // <Wrapper className="fixed top-0 w-full h-full bg-transparent flex flex-col items-center z-40">
        <div
            ref={modalRef}
            className={cn(
                "absolute",
                "border-2 border-secondary bg-white",
                "drop-shadow-2xl",
                "flex flex-col",
                "items-center",
                "justify-center",
                "max-w-[325px] min-w-[325px] md:right-4",
                "px-4 pb-8",
                "rounded-3xl right-0",
                "shadow-neobrut3",
                "top-[100px]",
                "w-11/12",
                "z-40",
            )}
        >
            <p className={cn("text-lg font-bold my-5")}>
                Continue with social profile
            </p>
            <OAuthOptions />
            {lastUsedOAuthProvider && (
                <p className={cn("mt-10 font-medium")}>
                    {`Most Recent Login: ${lastUsedOAuthProvider[0].toLocaleUpperCase()}${lastUsedOAuthProvider.substring(
                        1,
                    )}`}
                </p>
            )}
        </div>
        // </Wrapper>
    );
};

export default SignInModal;
