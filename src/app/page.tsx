import AiToolList from "./_components/ui/AiToolList";
import type { Metadata } from "next";
import Wrapper from "./_components/ui/Wrapper";
import cn from "@/utils/twMerge";

export const metadata: Metadata = {
    title: "Home - AiPlayground",
    description: "AiPlayground (AiPG) home page",
};

export default async function Home() {
    return (
        <Wrapper className={cn("mx-auto max-w-[1200px]", "px-4")}>
            <AiToolList />
        </Wrapper>
    );
}
