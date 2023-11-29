"use client";

import { BiSearchAlt } from "react-icons/bi";
import { BsArrowUpRightSquare } from "react-icons/bs";
import FieldInput from "./FieldInput";
import FormField from "./FormField";
import React from "react";
import Wrapper from "../ui/Wrapper";
import cn from "@/utils/twMerge";

const Search = (
    {
        /*...rest*/
    },
) => {
    // const [searchTerm, setSearchTerm] = useState<string>("");

    return (
        <FormField
            className={cn(
                "border-2 border-secondary bg-white",
                "flex",
                "h-[60px]",
                "items-center",
                "mx-auto max-w-[700px]",
                "rounded-lg",
                "shadow-neobrut2",
                "w-11/12",
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
                <BiSearchAlt color="#9c9c9c" size={24} />
            </Wrapper>
            <FieldInput
                className={cn("flex-1")}
                placeholder="Search for tools"
            />
            <Wrapper className={cn("p-2")}>
                <BsArrowUpRightSquare
                    className={cn("bg-primary", "cursor-pointer", "rounded-md")}
                    size={40}
                />
            </Wrapper>
        </FormField>
    );
};

export default Search;
