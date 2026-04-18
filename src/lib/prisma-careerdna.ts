import { PrismaClient } from ".prisma/careerdna-client";

const globalForPrisma = globalThis as unknown as {
  careerdnaPrisma: PrismaClient | undefined;
};

export const careerdnaPrisma =
  globalForPrisma.careerdnaPrisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.careerdnaPrisma = careerdnaPrisma;
}
