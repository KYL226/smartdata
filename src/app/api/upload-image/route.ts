import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

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

    // fileData is expected to be a base64 string (without data URL prefix)
    const buffer = Buffer.from(fileData, "base64");

    const uploadDir = path.join(process.cwd(), "public", "upload");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const safeName = fileName.replace(/[^a-zA-Z0-9.\-_]/g, "_");
    const finalPath = path.join(uploadDir, safeName);

    fs.writeFileSync(finalPath, buffer);

    const publicUrl = `/upload/${safeName}`;

    return NextResponse.json(
      { success: true, url: publicUrl },
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

