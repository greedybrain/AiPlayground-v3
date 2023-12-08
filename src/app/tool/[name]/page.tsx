import AiToolList from "@/app/_components/ui/AiToolList";
import React from "react";
import ToolInDetail from "@/app/_components/features/aiTool/ToolInDetail";
import Wrapper from "@/app/_components/ui/Wrapper";
import cn from "@/utils/twMerge";

const AiToolPage = () => {
    return (
        <Wrapper className={cn("mx-auto max-w-[1200px]", "w-11/12")}>
            <ToolInDetail />
            <Wrapper className={cn("mt-20")}>
                <AiToolList />
            </Wrapper>
        </Wrapper>
    );
};

export default AiToolPage;
