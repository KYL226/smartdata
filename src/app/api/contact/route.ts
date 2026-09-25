import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { sendMail } from "@/lib/mail";
import { clientIp, rateLimit } from "@/lib/rate-limit";
import { contactSchema, validateBody } from "@/lib/validation";

const CONTACT_WINDOW_MS = 60 * 60 * 1000;
const CONTACT_MAX_REQUESTS = 10;

export async function POST(request: Request) {
  const limited = rateLimit(
    `contact:${clientIp(request)}`,
    CONTACT_MAX_REQUESTS,
    CONTACT_WINDOW_MS
  );

  if (!limited.ok) {
    return NextResponse.json(
      {
        error: "Trop de messages envoyés. Réessayez plus tard.",
      },
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

  const parsed = validateBody(contactSchema, body);
  if (!parsed.ok) return parsed.response;

  const { name, email, phone, message } = parsed.data;

  try {
    const contactMessage = await db.contactMessage.create({
      data: {
        name,
        email,
        phone: phone ?? null,
        message,
      },
    });

    // Envoi d'e-mail SMTP (non bloquant pour la réponse API)
    try {
      await sendMail({
        subject: `Nouveau message de contact - ${name}`,
        text: [
          `Nom : ${name}`,
          `Email : ${email}`,
          `Téléphone : ${phone ?? "Non renseigné"}`,
          "",
          "Message :",
          message,
        ].join("\n"),
      });
    } catch (mailError) {
      console.error("Erreur lors de l'envoi de l'e-mail de contact :", mailError);
    }

    return NextResponse.json(
      { message: "Message sent successfully", id: contactMessage.id },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating contact message:", error);
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 }
    );
  }
}
