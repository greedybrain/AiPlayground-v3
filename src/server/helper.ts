"use server";

import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";

export const redirectIfUnauthorized = async () => {
    const session = await getServerSession(options);
    const isAdmin = session?.user.isAdmin;

    if (session) {
        if (!isAdmin) redirect("/");
    } else {
        redirect("/?authRequired=true");
    }
};
