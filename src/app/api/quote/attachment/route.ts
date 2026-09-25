import { NextResponse } from "next/server";
import { clientIp, rateLimit } from "@/lib/rate-limit";
import {
  DOCUMENT_EXTENSIONS,
  MAX_DOCUMENT_BYTES,
  UploadError,
  uploadBase64File,
} from "@/lib/upload";

const ATTACHMENT_WINDOW_MS = 60 * 60 * 1000;
const ATTACHMENT_MAX_REQUESTS = 10;

/**
 * Téléversement d'une pièce jointe de demande de devis.
 * Route publique (formulaire de devis) : limite stricte sur le volume,
 * l'extension et le nombre de requêtes.
 */
export async function POST(request: Request) {
  const limited = rateLimit(
    `quote-attachment:${clientIp(request)}`,
    ATTACHMENT_MAX_REQUESTS,
    ATTACHMENT_WINDOW_MS
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

  const { fileName, fileData } = body as {
    fileName?: string;
    fileData?: string;
  };

  if (!fileName || !fileData) {
    return NextResponse.json({ error: "Missing file data" }, { status: 400 });
  }

  try {
    const result = await uploadBase64File({
      fileName,
      fileData,
      allowedExtensions: DOCUMENT_EXTENSIONS,
      maxBytes: MAX_DOCUMENT_BYTES,
    });

    return NextResponse.json(
      { success: true, url: result.url, bytes: result.bytes },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof UploadError) {
      return NextResponse.json(
        { error: error.message },
        { status: error.status }
      );
    }
    console.error("Error uploading quote attachment:", error);
    return NextResponse.json(
      { error: "Failed to upload attachment" },
      { status: 500 }
    );
  }
}
