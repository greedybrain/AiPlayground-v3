"use server";

import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";

export const redirectIfUnauthorized = async () => {
    const session = await getServerSession(options);

    if (!session) redirect("/?authRequired=true");
};
