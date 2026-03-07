import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const ADMIN_FILE = path.join(process.cwd(), ".admin.json");

export async function POST(request: Request) {
  try {
    const { password } = await request.json();

    // Validation
    if (!password || password.length < 6) {
      return NextResponse.json(
        { error: "Mot de passe invalide (minimum 6 caractères)" },
        { status: 400 }
      );
    }

    // Vérifier si un admin existe déjà
    if (fs.existsSync(ADMIN_FILE)) {
      return NextResponse.json(
        { error: "Un administrateur existe déjà" },
        { status: 403 }
      );
    }

    // Enregistrement (⚠️ mot de passe en clair — voir note sécurité)
    fs.writeFileSync(
      ADMIN_FILE,
      JSON.stringify({ password }, null, 2),
      "utf-8"
    );

    return NextResponse.json({
      success: true,
      message: "Administrateur créé avec succès",
    });
  } catch (error) {
    console.error("Admin register error:", error);
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
}
