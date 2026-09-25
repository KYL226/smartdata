import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAdmin, unauthorizedResponse } from "@/lib/auth";
import { projectSchema, validateBody } from "@/lib/validation";

const PUBLIC_PROJECT_SELECT = {
  id: true,
  title: true,
  objective: true,
  testimonial: true,
  image: true,
  published: true,
  createdAt: true,
  updatedAt: true,
} as const;

export async function GET(request: Request) {
  const includeUnpublished =
    request.url.includes("all=1") && Boolean(requireAdmin(request));

  try {
    const projects = await db.project.findMany({
      where: includeUnpublished ? undefined : { published: true },
      orderBy: { createdAt: "desc" },
      take: 60,
      select: PUBLIC_PROJECT_SELECT,
    });

    return NextResponse.json(projects);
  } catch (error) {
    console.error("Error fetching projects:", error);
    return NextResponse.json(
      { error: "Failed to fetch projects" },
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

  const parsed = validateBody(projectSchema, body);
  if (!parsed.ok) return parsed.response;

  try {
    const project = await db.project.create({ data: parsed.data });
    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    console.error("Error creating project:", error);
    return NextResponse.json(
      { error: "Failed to create project" },
      { status: 500 }
    );
  }
}
