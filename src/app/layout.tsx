import "./globals.css";
import "tippy.js/dist/tippy.css";

import ClientLayout from "./clientLayout";
import DrawerNav from "./_components/ui/DrawerNav";
import Footer from "./_components/ui/Footer";
import { GoogleAnalytics } from "@next/third-parties/google";
import Header from "./_components/ui/Header";
import HeroContent from "./_components/ui/HeroContent";
import type { Metadata } from "next";
import SessionProvider from "../providers/SessionProvider";
import { Sora } from "next/font/google";
import SortAndFilter from "./_components/features/SortAndFilter";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Toaster } from "react-hot-toast";
import Video from "./_components/features/aiTool/Video";
import Wrapper from "./_components/ui/Wrapper";
import cn from "@/utils/twMerge";
import { getServerSession } from "next-auth";
import { options } from "./api/auth/[...nextauth]/options";

const inter = Sora({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
};

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await getServerSession(options);

    return (
        <html lang="en">
            <body className={cn(inter.className, "relative")}>
                <SessionProvider session={session}>
                    <div
                        className={cn(
                            "bg-gradient-to-b from-[#F9FFEF] to-[#D9F7FE]",
                            "flex flex-col",
                            "min-h-screen min-w-[360px] w-[11/12]",
                        )}
                    >
                        <Video />
                        <ClientLayout
                            className={cn("flex flex-col", "min-h-screen")}
                        >
                            <Toaster />
                            <Header />
                            <DrawerNav />
                            <SortAndFilter />
                            <Wrapper className={cn("flex-1")}>
                                <main>
                                    <GoogleAnalytics gaId="G-9GQPWB84JS" />
                                    <HeroContent />
                                    {children}
                                </main>
                            </Wrapper>
                            <Footer />
                        </ClientLayout>
                    </div>
                </SessionProvider>
                <SpeedInsights />
            </body>
        </html>
    );
}
