import nodemailer from "nodemailer";

const {
  SMTP_HOST,
  SMTP_PORT,
  SMTP_USER,
  SMTP_PASS,
  SMTP_FROM,
  SMTP_TO,
} = process.env;

const isConfigured = Boolean(SMTP_HOST && SMTP_FROM && SMTP_TO);

const transporter = isConfigured
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
      connectionTimeout: 10_000,
      greetingTimeout: 10_000,
      socketTimeout: 20_000,
    })
  : null;

type MailParams = {
  subject: string;
  text: string;
  html?: string;
};

export async function sendMail({ subject, text, html }: MailParams) {
  if (!transporter) {
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
    // Aucune ressource externe ne doit être résolue par le serveur de messagerie.
    disableFileAccess: true,
    disableUrlAccess: true,
  });
}
