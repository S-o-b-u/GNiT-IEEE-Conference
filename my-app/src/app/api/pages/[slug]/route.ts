import { storage } from "@/lib/storage";
import { isAuthenticated, unauthorized } from "@/lib/utils";
import { NextResponse } from "next/server";

// GET: Public - Fetch content for a specific page slug
export async function GET(
    req: Request, 
    { params }: { params: { slug: string }}
) {
    const page = await storage.getPage(params.slug); 

    if(!page) {
        return NextResponse.json({ title: "", content: "" }); 
    }

    return NextResponse.json(page); 
}

// PATCH: Admin - Update page content 
export async function PATCH(
    req: Request, 
    { params }: { params: { slug: string } }
) {
    if(!isAuthenticated) return unauthorized(); 
    try {
        const body = await req.json(); 
        const updatedPage = await storage.updatePage(params.slug, body); 
        return NextResponse.json(updatedPage); 
    } catch (error) {
        return NextResponse.json({ error: "Update Failed" }, { status: 500 }); 
    }
}