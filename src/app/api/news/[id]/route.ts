import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const body = await request.json();
    const { title, description, published } = body as {
      title?: string;
      description?: string;
      published?: boolean;
    };

    if (!title || !description) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    if (!id) {
      return NextResponse.json(
        { error: "Missing news item id" },
        { status: 400 }
      );
    }

    const item = await db.newsItem.update({
      where: { id },
      data: {
        title,
        description,
        published: published ?? true,
      },
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
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { error: "Missing news item id" },
        { status: 400 }
      );
    }

    await db.newsItem.delete({
      where: { id },
    });

    return NextResponse.json({ message: "News item deleted successfully" });
  } catch (error) {
    console.error("Error deleting news item:", error);
    return NextResponse.json(
      { error: "Failed to delete news item" },
      { status: 500 }
    );
  }
}

