import { storage } from "@/lib/storage";
import { isAuthenticated, unauthorized } from "@/lib/utils";
import { NextResponse } from "next/server";

export async function GET() {
  const data = await storage.getFees();
  return NextResponse.json(data);
}

export async function PATCH(req: Request) {
    if(!isAuthenticated(req)) return unauthorized(); 
    try {
        const body = await req.json(); 
        const { id, indianFee, internationalFee } = body 
        const updatedFee = await storage.updateFee(Number(id), indianFee, internationalFee); 
        return NextResponse.json(updatedFee)
    } catch (error) {
        return NextResponse.json({ error: "Update Failed" }, { status: 500 })
    }
}