import type { IOAuthOption } from "@/types";
import React from "react";
import cn from "@/utils/twMerge";
import usePopupStore from "@/store/slices/popup";

const OAuthOption = ({
    Icon,
    color,
    method,
    iconSize,
    authenticate,
}: IOAuthOption) => {
    const closeSignInPopup = usePopupStore((state) => state.closeSignInPopup);

    const lastUsedOAuthProvider = localStorage.getItem("lastUsedOAuthProvider");

    const wasLastLoginUsed =
        lastUsedOAuthProvider && lastUsedOAuthProvider === method;

    return (
        <li
            onClick={async () => {
                localStorage.setItem("lastUsedOAuthProvider", method);

                closeSignInPopup();
                authenticate();
            }}
            className={cn(
                "cursor-pointer",
                "flex flex-col",
                "gap-1",
                "items-center",
                "p-2",
                "w-[75px]",
            )}
            style={
                wasLastLoginUsed
                    ? {
                          border: `2px solid ${color ? color : "#2F2549"}`,
                          borderRadius: 14,
                      }
                    : {}
            }
        >
            <Icon
                className={cn("drop-shadow-md")}
                size={iconSize}
                style={{
                    fill: color,
                }}
            />
            <p className={cn("text-sm")}>{method}</p>
        </li>
    );
};

export default OAuthOption;
