import { storage } from "@/lib/storage";
import { isAuthenticated, unauthorized } from "@/lib/utils";
import { NextResponse } from "next/server";

// GET: Public -> Fetch all speakers
export async function GET() {
    try {
        const data = await storage.getSpeakers(); 
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch speakers" }, 
            { status: 500 }
        )
    }
}


// POST: Admin - Create a new Speaker
export async function POST(req: Request) {
    if(!isAuthenticated(req)) return unauthorized(); 

    try {
        const body = await req.json()
        const newSpeaker = await storage.createSpeaker(body) 
        return NextResponse.json(newSpeaker);  
    } catch (error) {
        return NextResponse.json({ error: "Invalid Data" }, { status: 400 })
    }
}

// PATCH: Admin - Update an existing speaker
export async function PATCH(req: Request) {
    if(!isAuthenticated(req)) return unauthorized(); 

    try {
        const body = await req.json(); 
        const { id, ...updateData } = body; 

        if(!id) {
            return NextResponse.json({ error: "Speaker ID is required for updates" }, { status: 400 } )
        }
        
        const updatedSpeaker = await storage.updateSpeaker(parseInt(id), updateData); 
        return NextResponse.json(updatedSpeaker); 

    } catch (error) {
        return NextResponse.json({ error: "Failed to update speaker" }, { status: 500 })
    }
} 

// DELETE: Admin - Delete speaker by ID (via Query Param: ?id=1)
export async function DELETE(req: Request) {
  if (!isAuthenticated(req)) return unauthorized();

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });

  await storage.deleteSpeaker(parseInt(id));
  return NextResponse.json({ success: true });
}