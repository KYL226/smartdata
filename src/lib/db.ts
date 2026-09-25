import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

const isProduction = process.env.NODE_ENV === "production";

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    // Les requêtes SQL ne sont journalisées qu'en développement :
    // en production elles dégradent les performances et exposent les données.
    log: isProduction ? ["error"] : ["query", "error"],
  });

if (!isProduction) globalForPrisma.prisma = db;
