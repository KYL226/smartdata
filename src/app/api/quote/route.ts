import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { sendMail } from "@/lib/mail";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { firstName, lastName, email, phone, serviceType, description, attachment } = body;

    if (!firstName || !lastName || !email || !phone || !serviceType || !description) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const quoteRequest = await db.quoteRequest.create({
      data: {
        firstName,
        lastName,
        email,
        phone,
        serviceType,
        description,
        attachment: attachment || null,
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
          `Pièce jointe : ${attachment ? "oui (stockée en base / à traiter)" : "non"}`,
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
