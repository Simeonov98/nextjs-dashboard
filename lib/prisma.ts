// lib/prisma.ts
import { PrismaClient } from "@prisma/client";
// import { createAdapter } from '@prisma/adapter-postgresql';

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    // adapter: createAdapter(process.env.DATABASE_URL!),
    log: ["query", "info", "warn", "error"],

  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
