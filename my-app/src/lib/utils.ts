import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { NextResponse } from "next/server"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// helper for Admin Access requests 
export function isAuthenticated(req: Request) {
  const authHeader = req.headers.get("x-admin-key"); 

  return authHeader === process.env.ADMIN_SECRET;
}

export function unauthorized() {
  return NextResponse.json({ error: "Unauthorized Access" }, { status: 401 })
}