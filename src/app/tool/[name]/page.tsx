import AiToolList from "@/app/_components/ui/AiToolList";
import React from "react";
import ToolAtGlance from "@/app/_components/features/aiTool/ToolAtGlance";
import Wrapper from "@/app/_components/ui/Wrapper";
import cn from "@/utils/twMerge";

const AiToolPage = () => {
    return (
        <Wrapper className={cn("mx-auto max-w-[1200px]", "w-11/12")}>
            <ToolAtGlance />
            <Wrapper className={cn("mt-20")}>
                <AiToolList />
            </Wrapper>
        </Wrapper>
    );
};

export default AiToolPage;
