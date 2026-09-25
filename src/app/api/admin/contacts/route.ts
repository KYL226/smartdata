import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAdmin, unauthorizedResponse } from "@/lib/auth";
import { paginationSchema, validateQuery } from "@/lib/validation";

export async function GET(request: Request) {
  if (!requireAdmin(request)) return unauthorizedResponse();

  const query = validateQuery(paginationSchema, request);
  if (!query.ok) return query.response;

  const { page, pageSize } = query.data;

  try {
    const [total, items] = await Promise.all([
      db.contactMessage.count(),
      db.contactMessage.findMany({
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
    ]);

    return NextResponse.json({ items, total, page, pageSize });
  } catch (error) {
    console.error("Error fetching contact messages:", error);
    return NextResponse.json(
      { error: "Failed to fetch contact messages" },
      { status: 500 }
    );
  }
}
