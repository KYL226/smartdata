import { NextResponse } from "next/server";
import crypto from "crypto";
import { cloudinary } from "@/lib/cloudinary";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { fileName, fileData } = body as { fileName?: string; fileData?: string };

    if (!fileName || !fileData) {
      return NextResponse.json(
        { error: "Missing file data" },
        { status: 400 }
      );
    }

    const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } =
      process.env;

    if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_API_KEY || !CLOUDINARY_API_SECRET) {
      return NextResponse.json(
        { error: "Cloudinary is not configured" },
        { status: 500 }
      );
    }

    // 🔹 Limite taille fichier (5MB)
    const MAX_SIZE = 5 * 1024 * 1024; // 5MB
    const fileSize = Buffer.from(fileData, "base64").length;

    if (fileSize > MAX_SIZE) {
      return NextResponse.json(
        { error: "File size exceeds 5MB limit" },
        { status: 400 }
      );
    }

    // fileData is expected to be a base64 string (without data URL prefix)
    // Upload via data URI to Cloudinary
    const safeName = fileName.replace(/[^a-zA-Z0-9.\-_]/g, "_");

    const ext = safeName.split(".").pop()?.toLowerCase();

    const mime =
      ext === "png"
        ? "image/png"
        : ext === "webp"
        ? "image/webp"
        : ext === "gif"
        ? "image/gif"
        : "image/jpeg";

    const publicId = `smartdata_${crypto
      .randomBytes(12)
      .toString("hex")}_${Date.now()}`;

    const uploadResult = await cloudinary.uploader.upload(
      `data:${mime};base64,${fileData}`,
      {
        folder: "smartdata",
        public_id: publicId,
        resource_type: "image",
      }
    );

    return NextResponse.json(
      { success: true, url: uploadResult.secure_url },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error uploading image:", error);

    return NextResponse.json(
      { error: "Failed to upload image" },
      { status: 500 }
    );
  }
}