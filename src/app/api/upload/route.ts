import { NextResponse } from "next/server";
import { requireAdmin, unauthorizedResponse } from "@/lib/auth";
import { clientIp, rateLimit } from "@/lib/rate-limit";
import {
  DOCUMENT_EXTENSIONS,
  IMAGE_EXTENSIONS,
  MAX_DOCUMENT_BYTES,
  MAX_IMAGE_BYTES,
  UploadError,
  uploadBase64File,
} from "@/lib/upload";

const UPLOAD_WINDOW_MS = 60 * 60 * 1000;
const UPLOAD_MAX_REQUESTS = 30;

type UploadKind = "image" | "document";

export async function POST(request: Request) {
  if (!requireAdmin(request)) return unauthorizedResponse();

  const limited = rateLimit(
    `upload:${clientIp(request)}`,
    UPLOAD_MAX_REQUESTS,
    UPLOAD_WINDOW_MS
  );
  if (!limited.ok) {
    return NextResponse.json(
      { error: "Trop de téléversements. Réessayez plus tard." },
      {
        status: 429,
        headers: { "Retry-After": String(limited.retryAfterSeconds) },
      }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Corps de requête invalide" },
      { status: 400 }
    );
  }

  const { fileName, fileData, kind } = body as {
    fileName?: string;
    fileData?: string;
    kind?: UploadKind;
  };

  if (!fileName || !fileData) {
    return NextResponse.json({ error: "Missing file data" }, { status: 400 });
  }

  try {
    const result = await uploadBase64File({
      fileName,
      fileData,
      allowedExtensions:
        kind === "document" ? DOCUMENT_EXTENSIONS : IMAGE_EXTENSIONS,
      maxBytes: kind === "document" ? MAX_DOCUMENT_BYTES : MAX_IMAGE_BYTES,
    });

    return NextResponse.json(
      { success: true, ...result },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof UploadError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }
    console.error("Error uploading file:", error);
    return NextResponse.json({ error: "Failed to upload file" }, { status: 500 });
  }
}
