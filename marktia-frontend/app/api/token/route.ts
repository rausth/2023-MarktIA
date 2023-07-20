import { cookies } from "next/dist/client/components/headers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const token = cookies().get("token");

    return NextResponse.json({
        data: token
    });
}