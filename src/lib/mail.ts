import nodemailer from "nodemailer";

const {
  SMTP_HOST,
  SMTP_PORT,
  SMTP_USER,
  SMTP_PASS,
  SMTP_FROM,
  SMTP_TO,
} = process.env;

const transporter =
  SMTP_HOST && (SMTP_USER == null || SMTP_PASS == null || SMTP_USER)
    ? nodemailer.createTransport({
        host: SMTP_HOST,
        port: Number(SMTP_PORT) || 587,
        secure: Number(SMTP_PORT) === 465,
        auth:
          SMTP_USER && SMTP_PASS
            ? {
                user: SMTP_USER,
                pass: SMTP_PASS,
              }
            : undefined,
      })
    : null;

type MailParams = {
  subject: string;
  text: string;
  html?: string;
};

export async function sendMail({ subject, text, html }: MailParams) {
  if (!SMTP_HOST || !SMTP_FROM || !SMTP_TO || !transporter) {
    console.warn(
      "[mail] SMTP non configuré (SMTP_HOST / SMTP_FROM / SMTP_TO manquants), envoi d'e-mail ignoré."
    );
    return;
  }

  await transporter.sendMail({
    from: SMTP_FROM,
    to: SMTP_TO,
    subject,
    text,
    html,
  });
}

