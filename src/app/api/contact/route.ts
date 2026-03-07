import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { sendMail } from "@/lib/mail";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const contactMessage = await db.contactMessage.create({
      data: {
        name,
        email,
        phone: phone || null,
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
          `Téléphone : ${phone || "Non renseigné"}`,
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
