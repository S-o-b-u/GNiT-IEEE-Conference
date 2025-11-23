import { storage } from "@/lib/storage";
import { isAuthenticated, unauthorized } from "@/lib/utils";
import { NextResponse } from "next/server";

export async function GET() {
  const settings = await storage.getSettings();
  return NextResponse.json(settings || {});
}

export async function PATCH(req: Request) {
  if (!isAuthenticated(req)) return unauthorized();

  const body = await req.json();
  const updated = await storage.updateSettings(body);
  return NextResponse.json(updated);
}