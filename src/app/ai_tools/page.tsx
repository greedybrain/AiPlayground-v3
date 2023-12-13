import AiToolsSortedPageContent from "../_components/ui/AiToolsSortedPageContent";
import type { Metadata } from "next";
import Wrapper from "../_components/ui/Wrapper";
import cn from "@/utils/twMerge";

export const metadata: Metadata = {
    title: "AiPlayground - AiTools",
    description: "Displays a list of tools sorted accordingly",
};

export default function AiToolsSortedPage() {
    return (
        <Wrapper className={cn("mx-auto max-w-[1200px]", "px-4")}>
            <AiToolsSortedPageContent />
        </Wrapper>
    );
}
