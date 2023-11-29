import type { IExistingAccountHandler } from "@/types";
import React from "react";
import Wrapper from "../ui/Wrapper";
import cn from "@/utils/twMerge";

const ExistingAccountHandler = ({
    authMode,
    setAuthMode,
    clearCredentials,
    ...restDivProps
}: IExistingAccountHandler) => {
    if (authMode === "login") return null;

    return (
        <Wrapper {...restDivProps}>
            <p>Already have an account?</p>
            <button
                className={cn("text-center text-link")}
                type="button"
                onClick={() => {
                    clearCredentials();
                    setAuthMode("login");
                }}
            >
                Login
            </button>
        </Wrapper>
    );
};

export default ExistingAccountHandler;
