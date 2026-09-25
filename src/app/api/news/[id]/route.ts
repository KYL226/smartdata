import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAdmin, unauthorizedResponse } from "@/lib/auth";
import { newsUpdateSchema, validateBody } from "@/lib/validation";

export async function PUT(
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

    const parsed = validateBody(newsUpdateSchema, body);
    if (!parsed.ok) return parsed.response;

    const item = await db.newsItem.update({
      where: { id },
      data: parsed.data,
    });

    return NextResponse.json(item);
  } catch (error) {
    console.error("Error updating news item:", error);
    return NextResponse.json(
      { error: "Failed to update news item" },
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

    await db.newsItem.delete({ where: { id } });

    return NextResponse.json({ message: "News item deleted successfully" });
  } catch (error) {
    console.error("Error deleting news item:", error);
    return NextResponse.json(
      { error: "Failed to delete news item" },
      { status: 500 }
    );
  }
}
