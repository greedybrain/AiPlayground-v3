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

    return (
        <li
            onClick={async () => {
                localStorage.setItem("lastUsedOAuthProvider", method);

                closeSignInPopup();

                await new Promise((resolve) =>
                    setTimeout(() => {
                        resolve(authenticate());
                    }, 1000),
                );
            }}
            className={cn("cursor-pointer")}
        >
            <Icon
                className={cn("drop-shadow-md")}
                size={iconSize}
                style={{
                    fill: color,
                }}
            />
        </li>
    );
};

export default OAuthOption;
