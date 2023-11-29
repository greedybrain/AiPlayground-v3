import type { INoAccountHandler } from "@/types";
import React from "react";
import Wrapper from "../ui/Wrapper";
import cn from "@/utils/twMerge";

const NoAccountHandler = ({
    authMode,
    setAuthMode,
    clearCredentials,
    ...restDivProps
}: INoAccountHandler) => {
    if (authMode === "signup") return null;

    return (
        <Wrapper {...restDivProps}>
            <p>No account?</p>
            <button
                className={cn("text-center text-link")}
                type="button"
                onClick={() => {
                    clearCredentials();
                    setAuthMode("signup");
                }}
            >
                Sign up
            </button>
        </Wrapper>
    );
};

export default NoAccountHandler;
