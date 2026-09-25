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
      db.project.count(),
      db.project.findMany({
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
    ]);

    return NextResponse.json({ items, total, page, pageSize });
  } catch (error) {
    console.error("Error fetching admin projects:", error);
    return NextResponse.json(
      { error: "Failed to fetch projects" },
      { status: 500 }
    );
  }
}
