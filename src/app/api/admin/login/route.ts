import { NextResponse } from "next/server";
import { buildSessionCookie, createSessionToken, safeEqual } from "@/lib/auth";
import { clientIp, rateLimit } from "@/lib/rate-limit";
import { loginSchema, validateBody } from "@/lib/validation";

const LOGIN_WINDOW_MS = 15 * 60 * 1000;
const LOGIN_MAX_ATTEMPTS = 5;

export async function POST(request: Request) {
  const ip = clientIp(request);
  const limited = rateLimit(
    `admin-login:${ip}`,
    LOGIN_MAX_ATTEMPTS,
    LOGIN_WINDOW_MS
  );

  if (!limited.ok) {
    return NextResponse.json(
      {
        error: `Trop de tentatives. Réessayez dans ${limited.retryAfterSeconds} secondes.`,
      },
      { status: 429, headers: { "Retry-After": String(limited.retryAfterSeconds) } }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Corps de requête invalide" }, { status: 400 });
  }

  const parsed = validateBody(loginSchema, body);
  if (!parsed.ok) return parsed.response;

  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword) {
    console.error(
      "[auth] ADMIN_PASSWORD n'est pas défini : connexion administrateur impossible."
    );
    return NextResponse.json(
      { error: "Configuration administrateur manquante" },
      { status: 500 }
    );
  }

  if (!safeEqual(parsed.data.password, adminPassword)) {
    return NextResponse.json({ error: "Mot de passe invalide" }, { status: 401 });
  }

  const token = createSessionToken();

  return NextResponse.json(
    { token, success: true },
    { headers: { "Set-Cookie": buildSessionCookie(token, request) } }
  );
}
