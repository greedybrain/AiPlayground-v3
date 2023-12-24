import { FaArrowLeft } from "react-icons/fa6";
import Link from "next/link";
import React from "react";
import Wrapper from "@/app/_components/ui/Wrapper";
import cn from "@/utils/twMerge";

const ToolActionsPage = () => {
    return (
        <Wrapper className={cn("mx-auto max-w-[1200px]", "px-4", "w-11/12")}>
            <Wrapper className={cn("flex", "gap-10", "items-center", "mt-5")}>
                <Link href="/admin">
                    <FaArrowLeft size={22} />
                </Link>
                <h1 className={cn("font-medium", "text-xl")}>
                    Manage Tools - Create, update, or delete tools
                </h1>
            </Wrapper>
        </Wrapper>
    );
};

export default ToolActionsPage;
