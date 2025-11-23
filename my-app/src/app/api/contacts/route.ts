import { storage } from "@/lib/storage";
import { isAuthenticated, unauthorized } from "@/lib/utils";
import { NextResponse } from "next/server";

// GET: Fetch all contacts
export async function GET() {
  try {
    const data = await storage.getContacts();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch contacts" }, { status: 500 });
  }
}

// POST: Create a new contact
export async function POST(req: Request) {
  if (!isAuthenticated(req)) return unauthorized();

  try {
    const body = await req.json();
    const newContact = await storage.createContact(body);
    return NextResponse.json(newContact);
  } catch (error) {
    // Catches JSON parsing errors or Zod validation failures (Schema mismatch)
    return NextResponse.json({ error: "Invalid contact data" }, { status: 400 });
  }
}

// DELETE: Remove a contact by ID
export async function DELETE(req: Request) {
  if (!isAuthenticated(req)) return unauthorized();

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Contact ID is required" }, { status: 400 });
    }

    await storage.deleteContact(Number(id));
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete contact" }, { status: 500 });
  }
}