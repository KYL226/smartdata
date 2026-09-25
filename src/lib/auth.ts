import { createHash, createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const SESSION_COOKIE = "admin_session";

const SESSION_TTL_MS = 24 * 60 * 60 * 1000;

export type Session = {
  exp: number;
};

function getSecret(): Buffer {
  const secret = process.env.SESSION_SECRET;
  if (!secret) {
    throw new Error(
      "SESSION_SECRET manquant : définissez-le dans .env pour signer les sessions administrateur."
    );
  }
  return Buffer.from(secret, "utf8");
}

function sign(payload: string): string {
  return createHmac("sha256", getSecret()).update(payload).digest("base64url");
}

export function createSessionToken(now: number = Date.now()): string {
  const payload = Buffer.from(
    JSON.stringify({ exp: now + SESSION_TTL_MS }),
    "utf8"
  ).toString("base64url");
  return `${payload}.${sign(payload)}`;
}

export function verifySessionToken(
  token: string | null | undefined
): Session | null {
  if (!token) return null;

  const separator = token.lastIndexOf(".");
  if (separator <= 0) return null;

  const payload = token.slice(0, separator);
  const provided = token.slice(separator + 1);
  const expected = sign(payload);

  const providedBuffer = Buffer.from(provided, "utf8");
  const expectedBuffer = Buffer.from(expected, "utf8");
  if (
    providedBuffer.length !== expectedBuffer.length ||
    !timingSafeEqual(providedBuffer, expectedBuffer)
  ) {
    return null;
  }

  try {
    const parsed = JSON.parse(
      Buffer.from(payload, "base64url").toString("utf8")
    ) as Partial<Session>;
    if (typeof parsed.exp !== "number" || parsed.exp < Date.now()) {
      return null;
    }
    return { exp: parsed.exp };
  } catch {
    return null;
  }
}

export async function getSession(): Promise<Session | null> {
  const store = await cookies();
  return verifySessionToken(store.get(SESSION_COOKIE)?.value);
}

function isSecureRequest(request: Request): boolean {
  if (process.env.COOKIE_SECURE === "true") return true;
  if (process.env.COOKIE_SECURE === "false") return false;
  const proto =
    request.headers.get("x-forwarded-proto")?.split(",")[0]?.trim() ??
    request.headers.get("x-proto");
  return proto === "https";
}

function serializeCookie(
  value: string,
  request: Request,
  maxAgeSeconds: number
): string {
  const parts = [
    `${SESSION_COOKIE}=${value}`,
    "Path=/",
    "HttpOnly",
    "SameSite=Strict",
    `Max-Age=${maxAgeSeconds}`,
  ];
  if (isSecureRequest(request)) parts.push("Secure");
  return parts.join("; ");
}

export function buildSessionCookie(token: string, request: Request): string {
  return serializeCookie(token, request, Math.ceil(SESSION_TTL_MS / 1000));
}

export function clearSessionCookie(request: Request): string {
  return serializeCookie("", request, 0);
}

/**
 * Vérifie la session administrateur côté serveur.
 * Retourne la session valide, ou `null` si absente / invalide / expirée.
 */
export function requireAdmin(request: Request): Session | null {
  const header = request.headers.get("cookie");
  if (!header) return null;

  for (const chunk of header.split(";")) {
    const index = chunk.indexOf("=");
    if (index === -1) continue;
    const name = chunk.slice(0, index).trim();
    if (name !== SESSION_COOKIE) continue;
    return verifySessionToken(chunk.slice(index + 1).trim());
  }
  return null;
}

export function unauthorizedResponse(
  message = "Authentification requise"
): NextResponse {
  return NextResponse.json({ error: message }, { status: 401 });
}

export function hashPasswordLike(value: string): Buffer {
  return createHash("sha256").update(value, "utf8").digest();
}

export function safeEqual(a: string, b: string): boolean {
  const digestA = hashPasswordLike(a);
  const digestB = hashPasswordLike(b);
  return timingSafeEqual(digestA, digestB);
}
