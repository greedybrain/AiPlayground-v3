import React from "react";
import Wrapper from "@/app/_components/ui/Wrapper";
import cn from "@/utils/twMerge";

const PromoActionsPage = () => {
    return (
        <Wrapper className={cn("mx-auto max-w-[1200px]", "px-4", "w-11/12")}>
            <h1 className={cn("font-medium", "mt-5", "text-2xl")}>
                Manage social media, and other promotions
            </h1>
        </Wrapper>
    );
};

export default PromoActionsPage;
