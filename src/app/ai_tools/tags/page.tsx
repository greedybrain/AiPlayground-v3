import AllTagsWithToolCount from "@/app/_components/features/AllTagsWithToolCount";
import { Metadata } from "next";
import React from "react";
import Wrapper from "@/app/_components/ui/Wrapper";
import cn from "@/utils/twMerge";

export const metadata: Metadata = {
    title: "AiPlayground - Tags List",
    description: "Displays a list of tools by category accordingly",
};

const TagsPage = () => {
    return (
        <>
            <Wrapper
                className={cn("max-w-[1200px] mx-auto", "px-4", "w-11/12")}
            >
                <h1 className={cn("font-bold", "mt-10", "text-3xl")}>
                    Tags Overview{" "}
                </h1>
                <p className={cn("text-secondary/80")}>
                    Explore all tags in one place.
                </p>
                <AllTagsWithToolCount />
            </Wrapper>
        </>
    );
};

export default TagsPage;
