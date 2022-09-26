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
      name: "Neuro",
      active: true,
      created_at: new Date(),
    },
  });

  await prisma.role.upsert({
    where: { id: "2" },
    update: {},
    create: {
      name: "Gestor",
      active: true,
      created_at: new Date(),
    },
  });

  await prisma.user.upsert({
    where: { email: "neuro@challenge.com.br" },
    update: {},
    create: {
      id_role: await (await prisma.role.findFirst({ where: { name: "Neuro" } })).id,
      email: "neuro@challenge.com.br",
      first_name: "Neuro",
      last_name: "Challenge",
      password: "$2b$08$7l609TK80Phx8Jg3ReWV7eZDPuHc.36JQvdE3bMC4IoSxBLliY3Zi",
    },
  });

  await prisma.user.upsert({
    where: { email: "gestor@challenge.com.br" },
    update: {},
    create: {
      id_role: await (await prisma.role.findFirst({ where: { name: "Gestor" } })).id,
      email: "gestor@challenge.com.br",
      first_name: "Gestor",
      last_name: "Challenge",
      password: "$2b$08$7l609TK80Phx8Jg3ReWV7eZDPuHc.36JQvdE3bMC4IoSxBLliY3Zi",
    },
  });

  await prisma.taskPriority.upsert({
    where: { id: "1" },
    update: {},
    create: {
      name: "Alta",
      created_at: new Date(),
    },
  });

  await prisma.taskPriority.upsert({
    where: { id: "2" },
    update: {},
    create: {
      name: "Média",
      created_at: new Date(),
    },
  });

  await prisma.taskPriority.upsert({
    where: { id: "3" },
    update: {},
    create: {
      name: "Baixa",
      created_at: new Date(),
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
