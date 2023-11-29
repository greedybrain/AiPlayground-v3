import AiToolList from "@/app/_components/ui/AiToolList";
import { Metadata } from "next";
import Wrapper from "@/app/_components/ui/Wrapper";
import cn from "@/utils/twMerge";

export const metadata: Metadata = {
    title: "AiPlayground - Tag",
    description: "Displays a list of tools by category accordingly",
};

export default function AiToolsByTagPage() {
    return (
        <Wrapper className={cn("mx-auto max-w-[1200px]", "px-4")}>
            <AiToolList />
        </Wrapper>
    );
}
