import crypto from "crypto";
import { cloudinary } from "@/lib/cloudinary";

export const IMAGE_EXTENSIONS = new Set([
  "jpg",
  "jpeg",
  "png",
  "webp",
  "gif",
  "avif",
]);

export const DOCUMENT_EXTENSIONS = new Set([
  "pdf",
  "doc",
  "docx",
  "xls",
  "xlsx",
]);

const IMAGE_MIME_TYPES: Record<string, string> = {
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  png: "image/png",
  webp: "image/webp",
  gif: "image/gif",
  avif: "image/avif",
};

const DOCUMENT_MIME_TYPES: Record<string, string> = {
  pdf: "application/pdf",
  doc: "application/msword",
  docx:
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  xls: "application/vnd.ms-excel",
  xlsx:
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
};

export const MAX_IMAGE_BYTES = 5 * 1024 * 1024; // 5MB
export const MAX_DOCUMENT_BYTES = 10 * 1024 * 1024; // 10MB

export class UploadError extends Error {
  readonly status: number;

  constructor(message: string, status = 400) {
    super(message);
    this.name = "UploadError";
    this.status = status;
  }
}

function estimatedBase64Bytes(base64Length: number): number {
  return Math.floor((base64Length * 3) / 4);
}

function requireCloudinaryConfig() {
  const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } =
    process.env;

  if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_API_KEY || !CLOUDINARY_API_SECRET) {
    throw new UploadError("Cloudinary is not configured", 500);
  }
}

export type UploadResult = {
  url: string;
  resourceType: "image" | "raw";
  bytes: number;
};

/**
 * Téléverse un fichier encodé en base64 vers Cloudinary.
 * Les contrôles de taille et d'extension sont effectués avant tout décodage.
 */
export async function uploadBase64File(options: {
  fileName: string;
  fileData: string;
  allowedExtensions: Set<string>;
  maxBytes: number;
}): Promise<UploadResult> {
  const { fileName, fileData, allowedExtensions, maxBytes } = options;

  if (!/^[A-Za-z0-9+/]+={0,2}$/.test(fileData)) {
    throw new UploadError("Invalid base64 payload");
  }

  const safeName = fileName.replace(/[^a-zA-Z0-9.\-_]/g, "_");
  const ext = safeName.split(".").pop()?.toLowerCase() ?? "";

  if (!allowedExtensions.has(ext)) {
    throw new UploadError("Extension de fichier non autorisée");
  }

  if (estimatedBase64Bytes(fileData.length) > maxBytes) {
    throw new UploadError(
      `Fichier trop volumineux (maximum ${Math.round(maxBytes / (1024 * 1024))}MB)`
    );
  }

  requireCloudinaryConfig();

  const isImage = IMAGE_EXTENSIONS.has(ext);
  const mime = isImage ? IMAGE_MIME_TYPES[ext] : DOCUMENT_MIME_TYPES[ext];
  const resourceType: "image" | "raw" = isImage ? "image" : "raw";

  const publicId = `smartdata_${crypto
    .randomBytes(12)
    .toString("hex")}_${Date.now()}`;

  try {
    const uploadResult = await cloudinary.uploader.upload(
      `data:${mime};base64,${fileData}`,
      {
        folder: "smartdata",
        public_id: publicId,
        resource_type: resourceType,
        type: "upload",
        access_mode: "public",
        overwrite: false,
        use_filename: false,
        unique_filename: false,
      }
    );

    return {
      url: uploadResult.secure_url,
      resourceType,
      bytes: uploadResult.bytes ?? 0,
    };
  } catch (error) {
    if (error instanceof UploadError) throw error;
    console.error("Error uploading file:", error);
    throw new UploadError("Failed to upload file", 500);
  }
}
