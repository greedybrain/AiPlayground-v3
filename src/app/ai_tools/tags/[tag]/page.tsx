import AiToolList from "@/app/_components/ui/AiToolList";
import { Metadata } from "next";
import SortHandler from "@/app/_components/features/SortHandler";

export const metadata: Metadata = {
    title: "AiPlayground - Tag",
    description: "Displays a list of tools by category accordingly",
};

export default function AiToolsByTagPage() {
    return (
        <>
            <SortHandler />
            <AiToolList />
        </>
    );
}
