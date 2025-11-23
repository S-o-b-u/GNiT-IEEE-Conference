import { storage } from "@/lib/storage";
import { isAuthenticated, unauthorized } from "@/lib/utils";
import { NextResponse } from "next/server";

// GET: Public - Get all committee members 
export async function GET(req: Request) {
    const { searchParams } = new URL(req.url); 

    // Allow filtering: /api/committee?role=Advisory
    const role = searchParams.get("role") as "Advisory" | "Organizing" | "TPC" | null; 

    const members = await storage.getCommittee(role || undefined); 
    return NextResponse.json(members); 
}

// POST: Admin - Create new committee member
export async function POST(req: Request) {
    if(!isAuthenticated) return unauthorized(); 
    
    const body = await req.json(); 
    const newMember = await storage.createCommitteeMember(body); 
    return NextResponse.json(newMember); 
}

// DELETE: Admin - Delete a committee member
export async function DELETE(req: Request) {
    if(!isAuthenticated(req)) return unauthorized(); 

    const { searchParams } = new URL(req.url); 
    const id = searchParams.get("id"); 

    if(id) await storage.deleteCommitteeMember(parseInt(id)); 
    return NextResponse.json({ success: true }); 
}