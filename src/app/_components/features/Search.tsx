"use client";

import React, { useState } from "react";

import { BiSearchAlt } from "react-icons/bi";
import { BsArrowUpRightSquare } from "react-icons/bs";
import FieldInput from "./FieldInput";
import FormField from "./FormField";
import Wrapper from "../ui/Wrapper";
import cn from "@/utils/twMerge";
import { useRouter } from "next/navigation";

const Search = () => {
    const [isFocused, setFocus] = useState<boolean>(false);
    const [userQuery, setUserQuery] = useState<string>("");
    const { push } = useRouter();

    const handleSubmit = async () => {
        const queryParams = new URLSearchParams();

        queryParams.append("query", userQuery);

        const path = `/ai_tools/search?${queryParams.toString()}`;

        setUserQuery("");
        push(path);
    };

    return (
        <FormField
            className={cn(
                "border-2 border-secondary bg-white",
                "flex",
                "h-[70px]",
                "items-center",
                "mx-auto max-w-[700px]",
                "rounded-lg",
                "shadow-neobrut2",
                "transition-all",
                "w-11/12",
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
                className={cn("flex-1", "placeholder:text-lg", "text-lg")}
                placeholder="Search for tools"
                onFocus={() => setFocus(true)}
                onBlur={() => setFocus(false)}
                onChange={(event) => setUserQuery(event.target.value)}
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
