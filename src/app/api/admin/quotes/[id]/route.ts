import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { status } = body as { status?: string };

    if (!status) {
      return NextResponse.json(
        { error: "Missing status field" },
        { status: 400 }
      );
    }

    const updated = await db.quoteRequest.update({
      where: { id },
      data: { status },
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
  try {
    const { id } = await params;
    await db.quoteRequest.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Quote request deleted successfully" });
  } catch (error) {
    console.error("Error deleting quote request:", error);
    return NextResponse.json(
      { error: "Failed to delete quote request" },
      { status: 500 }
    );
  }
}

