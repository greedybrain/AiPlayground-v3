"use client";

import React, { useState } from "react";

import { BiSolidUser } from "react-icons/bi";
import { BsCheck2Circle } from "react-icons/bs";
import ExistingAccountHandler from "./ExistingAccountHandler";
import FieldInput from "./FieldInput";
import FormField from "./FormField";
import { MdPassword } from "react-icons/md";
import NoAccountHandler from "./NoAccountHandler";
import Wrapper from "../ui/Wrapper";
import cn from "@/utils/twMerge";

/**
 * Responsibility - Allow a user to sign in with email (passwordless)
 * Resusable - Yes (in other applications)
 * Similar Comps - No
 * State and Data:
 *      - Has local state
 *      - Manages user email input
 *      - No props, all data is specific to component
 * UI and Interaction:
 *      - User fills out email input, handled via handleChange()
 *      - Handle pending/loading status, handles errors
 */

const existOrNonExistAccountClassnames = cn(
    "flex",
    "gap-1",
    "items-center",
    "justify-center",
    "mt-4",
);

const formFieldClassnames = cn(
    "border-2 border-secondary",
    "flex",
    "h-[60px]",
    "items-center",
    "rounded-lg",
    "shadow-neobrut1",
    "w-full",
);

const fieldIconClassnames = cn(
    "flex",
    "h-full",
    "items-center",
    "justify-center",
    "w-[45px]",
);

const fieldInputClassnames = cn(
    "flex-1",
    "placeholder:text-slate-500",
    "text-lg ",
);

const submitButtonClassnames = cn(
    "bg-secondary border-secondary",
    "flex",
    "gap-2",
    "h-[60px] ",
    "items-center",
    "justify-center",
    "mt-4",
    "rounded-lg",
    "text-white text-lg",
    "w-full",
);

const AuthForm = () => {
    const [credentials, setCredentials] = useState<{
        identifier: string;
        password: string;
        confirmPassword?: string;
    }>({
        identifier: "",
        password: "",
        confirmPassword: "",
    });
    const [authMode, setAuthMode] = useState<"login" | "signup">("login");
    const [passwordsMatch, setPasswordsMatch] = useState<boolean | null>(null);

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        if (authMode === "login") {
            // Handle login
        } else {
            // Handle signup
        }

        clearCredentials();
    };

    const clearCredentials = () => {
        setCredentials({
            identifier: "",
            password: "",
            confirmPassword: "",
        });
    };

    return (
        <form className={cn("w-full")} onSubmit={handleSubmit}>
            <FormField className={formFieldClassnames}>
                <Wrapper id="UserIconWrapper" className={fieldIconClassnames}>
                    <BiSolidUser color="#2F2549" size={24} />
                </Wrapper>
                <FieldInput
                    className={fieldInputClassnames}
                    type="text"
                    name="identifier"
                    value={credentials.identifier}
                    placeholder="Enter email or username"
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                        setCredentials((prev) => ({
                            ...prev,
                            identifier: event.target.value,
                        }))
                    }
                />
            </FormField>
            <FormField className={formFieldClassnames + " mt-4"}>
                <Wrapper id="UserIconWrapper" className={fieldIconClassnames}>
                    <MdPassword color="#2F2549" size={24} />
                </Wrapper>
                <FieldInput
                    className={fieldInputClassnames}
                    type="password"
                    name="password"
                    value={credentials.password}
                    placeholder="Enter password"
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        const value = event.target.value;

                        if (value.length === 0) {
                            setPasswordsMatch(null);
                            setCredentials((prev) => ({
                                ...prev,
                                password: "",
                            }));
                            return;
                        }

                        if (!credentials.confirmPassword) {
                            setPasswordsMatch(null);
                        } else if (value !== credentials.confirmPassword) {
                            setPasswordsMatch(false);
                        } else {
                            setPasswordsMatch(true);
                        }

                        setCredentials((prev) => ({
                            ...prev,
                            password: value,
                        }));
                    }}
                />
            </FormField>
            {authMode === "signup" && (
                <FormField className={formFieldClassnames + " mt-4"}>
                    <Wrapper
                        id="UserIconWrapper"
                        className={fieldIconClassnames}
                    >
                        <BsCheck2Circle
                            color={`${
                                passwordsMatch === null
                                    ? "#2F2549"
                                    : passwordsMatch
                                    ? "#00b103"
                                    : "#f80000"
                            }`}
                            size={24}
                        />
                    </Wrapper>
                    <FieldInput
                        className={fieldInputClassnames}
                        type="password"
                        name="confirmPassword"
                        value={credentials.confirmPassword}
                        placeholder="Confirm password"
                        onChange={(
                            event: React.ChangeEvent<HTMLInputElement>,
                        ) => {
                            const value = event.target.value;

                            if (value.length === 0) {
                                setPasswordsMatch(null);
                                setCredentials((prev) => ({
                                    ...prev,
                                    confirmPassword: "",
                                }));
                                return;
                            }

                            if (value !== credentials.password) {
                                setPasswordsMatch(false);
                            } else {
                                setPasswordsMatch(true);
                            }

                            setCredentials((prev) => ({
                                ...prev,
                                confirmPassword: value,
                            }));
                        }}
                    />
                </FormField>
            )}
            <button className={submitButtonClassnames} type="submit">
                {authMode === "login" ? "Login" : "Sign up"}
            </button>

            {authMode === "login" ? (
                <NoAccountHandler
                    className={existOrNonExistAccountClassnames}
                    authMode={authMode}
                    setAuthMode={setAuthMode}
                    clearCredentials={clearCredentials}
                />
            ) : (
                <ExistingAccountHandler
                    className={existOrNonExistAccountClassnames}
                    authMode={authMode}
                    setAuthMode={setAuthMode}
                    clearCredentials={clearCredentials}
                />
            )}
        </form>
    );
};

export default AuthForm;
