import { storage } from "@/lib/storage";
import { isAuthenticated, unauthorized } from "@/lib/utils";
import { NextResponse } from "next/server";

// GET: Public - Fetch all important Dates
export async function GET() {
    const dates = await storage.getDates(); 
    return NextResponse.json(dates); 
}

// POST: Admin - Add an Important Date
export async function POST(req: Request) {
    if(!isAuthenticated) return unauthorized(); 

    const body = await req.json(); 
    const newDate = await storage.createDate(body); 
    return NextResponse.json(newDate); 
}

export async function DELETE(req: Request) {
  if (!isAuthenticated(req)) return unauthorized();
  
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });

  await storage.deleteDate(parseInt(id));
  return NextResponse.json({ success: true });
}

