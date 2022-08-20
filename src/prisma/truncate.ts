import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
import path from "path";

process.env.NODE_ENV = process.env.NODE_ENV || "development";

dotenv.config({
  path: path.resolve(__dirname, "..", "..", `.env.${process.env.NODE_ENV}`),
});

const prisma = new PrismaClient();

async function main() {
  await prisma.user.deleteMany();
  await prisma.role.deleteMany();
}

main()
  .then(() => {
    // eslint-disable-next-line no-console
    console.log("Database Truncated!");
  })
  .catch((e) => {
    // eslint-disable-next-line no-console
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await prisma.$disconnect();
  });
