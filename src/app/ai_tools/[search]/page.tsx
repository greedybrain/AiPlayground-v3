import AiToolsFromSearchPageContent from "@/app/_components/ui/AiToolsFromSearchPageContent";
import type { Metadata } from "next";
import Wrapper from "@/app/_components/ui/Wrapper";
import cn from "@/utils/twMerge";

export const metadata: Metadata = {
    title: "AiPlayground - AiTools",
    description: "Displays a list of tools according to a  users query",
};

export default function AiToolsFromSearchPage() {
    return (
        <Wrapper className={cn("mx-auto max-w-[1200px]", "px-4")}>
            <AiToolsFromSearchPageContent />
        </Wrapper>
    );
}
