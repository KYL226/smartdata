import { NextResponse } from "next/server";
import { clearSessionCookie } from "@/lib/auth";

export async function POST(request: Request) {
  return NextResponse.json(
    { success: true },
    { headers: { "Set-Cookie": clearSessionCookie(request) } }
  );
}
