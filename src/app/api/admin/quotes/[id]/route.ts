import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAdmin, unauthorizedResponse } from "@/lib/auth";
import { quoteStatusSchema, validateBody } from "@/lib/validation";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!requireAdmin(request)) return unauthorizedResponse();

  try {
    const { id } = await params;

    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { error: "Corps de requête invalide" },
        { status: 400 }
      );
    }

    const parsed = validateBody(quoteStatusSchema, body);
    if (!parsed.ok) return parsed.response;

    const updated = await db.quoteRequest.update({
      where: { id },
      data: { status: parsed.data.status },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Error updating quote request status:", error);
    return NextResponse.json(
      { error: "Failed to update quote request" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!requireAdmin(request)) return unauthorizedResponse();

  try {
    const { id } = await params;
    await db.quoteRequest.delete({ where: { id } });

    return NextResponse.json({ message: "Quote request deleted successfully" });
  } catch (error) {
    console.error("Error deleting quote request:", error);
    return NextResponse.json(
      { error: "Failed to delete quote request" },
      { status: 500 }
    );
  }
}
