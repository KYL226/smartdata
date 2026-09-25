import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { sendMail } from "@/lib/mail";
import { clientIp, rateLimit } from "@/lib/rate-limit";
import { quoteSchema, validateBody } from "@/lib/validation";

const QUOTE_WINDOW_MS = 60 * 60 * 1000;
const QUOTE_MAX_REQUESTS = 10;

export async function POST(request: Request) {
  const limited = rateLimit(
    `quote:${clientIp(request)}`,
    QUOTE_MAX_REQUESTS,
    QUOTE_WINDOW_MS
  );

  if (!limited.ok) {
    return NextResponse.json(
      { error: "Trop de demandes envoyées. Réessayez plus tard." },
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
    return NextResponse.json({ error: "Corps de requête invalide" }, { status: 400 });
  }

  const parsed = validateBody(quoteSchema, body);
  if (!parsed.ok) return parsed.response;

  const {
    firstName,
    lastName,
    email,
    phone,
    serviceType,
    description,
    attachment,
  } = parsed.data;

  try {
    const quoteRequest = await db.quoteRequest.create({
      data: {
        firstName,
        lastName,
        email,
        phone,
        serviceType,
        description,
        attachment: attachment ?? null,
      },
    });

    // Envoi d'e-mail SMTP (non bloquant pour la réponse API)
    try {
      const fullName = `${firstName} ${lastName}`.trim();
      await sendMail({
        subject: `Nouvelle demande de devis - ${fullName || email}`,
        text: [
          `Nom : ${fullName}`,
          `Email : ${email}`,
          `Téléphone : ${phone}`,
          `Type de service : ${serviceType}`,
          "",
          "Description du besoin :",
          description,
          "",
          `Pièce jointe : ${attachment ?? "non"}`,
        ].join("\n"),
      });
    } catch (mailError) {
      console.error("Erreur lors de l'envoi de l'e-mail de devis :", mailError);
    }

    return NextResponse.json(
      { message: "Quote request sent successfully", id: quoteRequest.id },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating quote request:", error);
    return NextResponse.json(
      { error: "Failed to send quote request" },
      { status: 500 }
    );
  }
}
