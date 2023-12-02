"use client";

import { useParams, usePathname, useSearchParams } from "next/navigation";

import AIBannerHighlights from "./AIBannerHighlights";
import Link from "next/link";
import LogoName from "./LogoName";
import React from "react";
import Search from "../features/Search";
import TaglinePrimary from "./TaglinePrimary";
import TaglineSecondary from "./TaglineSecondary";
import Wrapper from "./Wrapper";
import cn from "@/utils/twMerge";

const HeroContent = () => {
    const pathname = usePathname();
    const { tag } = useParams();
    const searchParams = useSearchParams();

    const hiddenPaths = [
        "/user/favorites",
        "/privacy",
        "/tool",
        "/ai_tools/tags",
        "/ai_tools",
    ];

    const shouldBeHidden = hiddenPaths.some((path) => {
        if (pathname.startsWith(path)) {
            if (tag || searchParams.toString().length) {
                return false;
            }
            return true;
        }
        return false;
    });

    if (shouldBeHidden) return null;

    return (
        <>
            <Wrapper className={cn("max-w-[1200px] mx-auto", "px-4")}>
                <Wrapper className={cn("mx-auto mt-10 md:w-1/2", "w-[300px]")}>
                    <LogoName
                        className={cn(
                            "border-2 border-secondary bg-tertiary",
                            "font-bold",
                            "left-7",
                            "py-3",
                            "relative rounded-lg -rotate-6",
                            "shadow-neobrut2",
                            "text-center text-sm",
                            "w-[140px]",
                        )}
                    />
                </Wrapper>
                <TaglinePrimary
                    className={cn(
                        "font-extrabold",
                        "mx-auto min-w-[300px] max-w-[330px] md:text-7xl md:max-w-[800px] md:w-auto",
                        "text-4xl text-center",
                        "w-[50%]",
                    )}
                    abbrevStyles={cn("text-primary")}
                />
                <TaglineSecondary
                    className={cn(
                        "font-semibold",
                        "mx-auto mt-8 md:text-lg",
                        "text-sm text-center",
                    )}
                />
                <Wrapper
                    className={cn("flex flex-col", "items-center", "mt-14")}
                >
                    <Search />
                    <Link
                        href="/ai_tools/tags"
                        className={cn(
                            "font-medium",
                            "mt-10",
                            "text-link text-lg",
                            "underline",
                        )}
                    >
                        See all tags
                    </Link>
                </Wrapper>
            </Wrapper>
            <AIBannerHighlights />
        </>
    );
};

export default HeroContent;
