import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient;
}

const globalForPrisma = global;

const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default prisma;
