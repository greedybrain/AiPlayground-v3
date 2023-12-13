import AiToolDetailPageContent from "@/app/_components/ui/AiToolDetailPageContent";
import React from "react";
import Wrapper from "@/app/_components/ui/Wrapper";
import cn from "@/utils/twMerge";

const AiToolDetailPage = () => {
    return (
        <Wrapper className={cn("mx-auto max-w-[1200px]", "w-11/12")}>
            <AiToolDetailPageContent />
        </Wrapper>
    );
};

export default AiToolDetailPage;
