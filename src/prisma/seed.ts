import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
import path from "path";

process.env.NODE_ENV = process.env.NODE_ENV || "development";

dotenv.config({
  path: path.resolve(__dirname, "..", "..", `.env.${process.env.NODE_ENV}`),
});

const prisma = new PrismaClient();

async function main() {
  await prisma.role.upsert({
    where: { id: "1" },
    update: {},
    create: {
      name: "Administrator",
      active: true,
      created_at: new Date(),
    },
  });

  await prisma.role.upsert({
    where: { id: "2" },
    update: {},
    create: {
      name: "User",
      active: true,
      created_at: new Date(),
    },
  });

  await prisma.user.upsert({
    where: { email: "user@cryptoboard.com.br" },
    update: {},
    create: {
      id_role: await (await prisma.role.findFirst({ where: { name: "User" } })).id,
      email: "user@cryptoboard.com.br",
      first_name: "User",
      last_name: "Cryptoboard",
      password: "$2b$08$7l609TK80Phx8Jg3ReWV7eZDPuHc.36JQvdE3bMC4IoSxBLliY3Zi",
    },
  });

  await prisma.user.upsert({
    where: { email: "admin@cryptoboard.com.br" },
    update: {},
    create: {
      id_role: await (await prisma.role.findFirst({ where: { name: "Administrator" } })).id,
      email: "admin@cryptoboard.com.br",
      first_name: "Admin",
      last_name: "Cryptoboard",
      password: "$2b$08$7l609TK80Phx8Jg3ReWV7eZDPuHc.36JQvdE3bMC4IoSxBLliY3Zi",
    },
  });
}

main()
  .then(() => {
    // eslint-disable-next-line no-console
    console.log("Seeds was put on your database!");
  })
  .catch((e) => {
    // eslint-disable-next-line no-console
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
