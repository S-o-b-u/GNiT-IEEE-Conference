import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const body = await req.json(); 
    const { password } = body;

    if(password === process.env.ADMIN_SECRET) {
        return NextResponse.json({ success: true }); 
    } else {
        return NextResponse.json({ error: "Invalid Credentials" }, { status: 401 }); 
    }
}