import { NextRequest, NextResponse } from "next/server";

import { redis } from "@/server/redis";

export async function GET(req: NextRequest) {
    try {
        const ipFromHeaders = req.headers.get("x-forwarded-for");
        const clientIp = ipFromHeaders ?? req.ip;

        const cachedIp = await redis.get<string>(`ip:${clientIp}`);

        if (cachedIp) {
            return NextResponse.json({
                message: "Retrieved IP from cache",
                ip: cachedIp,
            });
        }

        await redis.set(`ip:${clientIp}`, clientIp);

        // Rest of your API logic
        return NextResponse.json({ message: "Retrieved IP", ip: clientIp });
    } catch (error) {
        return NextResponse.json({ error });
    }
}
