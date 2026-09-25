import { z } from "zod";
import { NextResponse } from "next/server";

const requiredText = (max: number, label: string) =>
  z
    .string({ error: `${label} requis` })
    .trim()
    .min(1, `${label} requis`)
    .max(max, `${label} : maximum ${max} caractères`);

const optionalText = (max: number, label: string) =>
  z
    .string()
    .trim()
    .max(max, `${label} : maximum ${max} caractères`)
    .optional()
    .transform((value) => (value ? value : undefined));

const emailField = z
  .email("Adresse e-mail invalide")
  .max(191, "Adresse e-mail : maximum 191 caractères");

const booleanField = z
  .boolean()
  .optional()
  .transform((value) => value ?? true);

export const QUOTE_STATUSES = [
  "pending",
  "in_progress",
  "done",
  "cancelled",
] as const;

export const QUOTE_SERVICE_TYPES = [
  "accompagnement-redaction-memoire-these",
  "collecte-donnees-extraction-web",
  "etude-marche",
  "visualisation-donnees",
  "formations-accompagnement",
  "autre",
] as const;

export const loginSchema = z.object({
  password: z
    .string({ error: "Mot de passe requis" })
    .min(1, "Mot de passe requis")
    .max(200, "Mot de passe : maximum 200 caractères"),
});

export const contactSchema = z.object({
  name: requiredText(191, "Le nom"),
  email: emailField,
  phone: optionalText(191, "Le téléphone"),
  message: requiredText(5000, "Le message"),
});

export const quoteSchema = z.object({
  firstName: requiredText(191, "Le prénom"),
  lastName: requiredText(191, "Le nom"),
  email: emailField,
  phone: requiredText(191, "Le téléphone"),
  serviceType: z.enum(QUOTE_SERVICE_TYPES, {
    error: "Type de service invalide",
  }),
  description: requiredText(10000, "La description"),
  attachment: optionalText(191, "La pièce jointe"),
});

export const projectSchema = z.object({
  title: requiredText(191, "Le titre"),
  objective: requiredText(5000, "L'objectif"),
  methodology: requiredText(10000, "La méthodologie"),
  results: requiredText(10000, "Les résultats"),
  testimonial: optionalText(5000, "Le témoignage"),
  image: requiredText(191, "L'image"),
  published: booleanField,
});

export const projectUpdateSchema = projectSchema.partial().refine(
  (value) => Object.keys(value).length > 0,
  { error: "Aucune donnée à mettre à jour" }
);

export const newsSchema = z.object({
  title: requiredText(191, "Le titre"),
  description: requiredText(5000, "La description"),
  published: booleanField,
});

export const newsUpdateSchema = newsSchema.partial().refine(
  (value) => Object.keys(value).length > 0,
  { error: "Aucune donnée à mettre à jour" }
);

export const quoteStatusSchema = z.object({
  status: z.enum(QUOTE_STATUSES, { error: "Statut invalide" }),
});

export const paginationSchema = z.object({
  page: z.coerce.number().int().min(1).max(10_000).default(1),
  pageSize: z.coerce.number().int().min(1).max(100).default(20),
});

export type ValidationResult<T> =
  | { ok: true; data: T }
  | { ok: false; response: NextResponse };

/**
 * Valide un corps de requête avec un schéma Zod.
 * En cas d'échec, retourne une réponse 401/400 prête à être retournée.
 */
export function validateBody<T>(
  schema: z.ZodType<T>,
  body: unknown,
  { status = 400 }: { status?: number } = {}
): ValidationResult<T> {
  const result = schema.safeParse(body);
  if (result.success) {
    return { ok: true, data: result.data };
  }
  const first = result.error.issues[0];
  const message = first?.message ?? "Données invalides";
  return {
    ok: false,
    response: NextResponse.json({ error: message }, { status }),
  };
}

export function validateQuery<T>(
  schema: z.ZodType<T>,
  request: Request
): ValidationResult<T> {
  const params = Object.fromEntries(
    new URL(request.url).searchParams.entries()
  );
  const result = schema.safeParse(params);
  if (result.success) {
    return { ok: true, data: result.data };
  }
  const first = result.error.issues[0];
  return {
    ok: false,
    response: NextResponse.json(
      { error: first?.message ?? "Paramètres invalides" },
      { status: 400 }
    ),
  };
}
