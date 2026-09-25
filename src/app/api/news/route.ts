import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAdmin, unauthorizedResponse } from "@/lib/auth";
import { newsSchema, validateBody } from "@/lib/validation";

export async function GET() {
  try {
    const items = await db.newsItem.findMany({
      where: {
        published: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 50,
    });

    return NextResponse.json(items);
  } catch (error) {
    console.error("Error fetching news items:", error);
    return NextResponse.json(
      { error: "Failed to fetch news items" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  if (!requireAdmin(request)) return unauthorizedResponse();

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Corps de requête invalide" }, { status: 400 });
  }

  const parsed = validateBody(newsSchema, body);
  if (!parsed.ok) return parsed.response;

  try {
    const item = await db.newsItem.create({ data: parsed.data });
    return NextResponse.json(item, { status: 201 });
  } catch (error) {
    console.error("Error creating news item:", error);
    return NextResponse.json(
      { error: "Failed to create news item" },
      { status: 500 }
    );
  }
}
