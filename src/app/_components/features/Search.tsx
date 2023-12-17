"use client";

import React, { useEffect, useState } from "react";

import { BiSearchAlt } from "react-icons/bi";
import { BsArrowUpRightSquare } from "react-icons/bs";
import FieldInput from "./FieldInput";
import FormField from "./FormField";
import { PLACEHOLDERS } from "@/constants";
import Wrapper from "../ui/Wrapper";
import cn from "@/utils/twMerge";
import { useRouter } from "next/navigation";

const Search = () => {
    const [isFocused, setFocus] = useState<boolean>(false);
    const [userQuery, setUserQuery] = useState<string>("");
    const [placeholderIndex, setPlaceholderIndex] = useState(0);
    const [placeholder, setPlaceholder] = useState<string>("");
    const [isTyping, setIsTyping] = useState(true);
    const { push } = useRouter();

    const handleSubmit = async () => {
        const queryParams = new URLSearchParams();

        queryParams.append("query", userQuery);

        const path = `/ai_tools/search?${queryParams.toString()}`;

        setUserQuery("");
        push(path);
    };

    useEffect(() => {
        if (isTyping) {
            if (placeholder.length < PLACEHOLDERS[placeholderIndex].length) {
                setTimeout(() => {
                    setPlaceholder(
                        PLACEHOLDERS[placeholderIndex].substring(
                            0,
                            placeholder.length + 1,
                        ),
                    );
                }, 25); // Speed of typing
            } else {
                setTimeout(() => {
                    setIsTyping(false);
                }, 1500); // Wait time before deleting
            }
        } else {
            if (placeholder.length > 0) {
                setTimeout(() => {
                    setPlaceholder(
                        PLACEHOLDERS[placeholderIndex].substring(
                            0,
                            placeholder.length - 1,
                        ),
                    );
                }, 10); // Speed of deleting
            } else {
                setTimeout(() => {
                    setPlaceholderIndex(
                        (placeholderIndex + 1) % PLACEHOLDERS.length,
                    );
                    setIsTyping(true);
                }, 500); // Wait time before typing next placeholder
            }
        }
    }, [placeholder, isTyping, placeholderIndex]);

    return (
        <FormField
            className={cn(
                "border-2 border-secondary bg-white",
                "flex",
                "h-[70px]",
                "items-center",
                "mx-auto max-w-[800px]",
                "rounded-lg",
                "shadow-neobrut2",
                "transition-all",
                "w-full",
                {
                    "border-[3px] shadow-neobrut3": isFocused,
                },
            )}
        >
            <Wrapper
                className={cn(
                    "flex",
                    "h-full",
                    "items-center",
                    "justify-center",
                    "w-[50px]",
                )}
            >
                <BiSearchAlt color="#9c9c9c" size={30} />
            </Wrapper>
            <FieldInput
                className={cn("flex-1", "text-lg")}
                placeholder={placeholder}
                onFocus={() => setFocus(true)}
                onBlur={() => setFocus(false)}
                onChange={(event) => setUserQuery(event.target.value)}
                onKeyDown={(event) => {
                    if (event.key === "Enter") {
                        handleSubmit();
                    }
                }}
                value={userQuery}
            />
            <Wrapper className={cn("p-2")} onClick={handleSubmit}>
                <BsArrowUpRightSquare
                    className={cn("bg-primary", "cursor-pointer", "rounded-md")}
                    size={50}
                />
            </Wrapper>
        </FormField>
    );
};

export default Search;
