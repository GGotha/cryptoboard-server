import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import Authentication from "../../classes/Authentication";
import CustomError from "../../errors";

const prisma = new PrismaClient();

export class UserController {
  public static async session(req: Request, res: Response) {
    const { email, password } = req.body;

    try {
      const user = await prisma.user.findFirst({ where: { email }, include: { role: true } });

      if (!user || !bcrypt.compare(password, user.password)) {
        throw new CustomError({ message: "Email ou senha inválidos", statusCode: 400 });
      }

      delete user.password;

      return res.send({
        success: true,
        user,
        token: Authentication.generateToken({ userId: user.id }),
      });
    } catch (error) {
      if (error instanceof CustomError) {
        return res.status(error.statusCode).send({
          success: false,
          message: error.message,
        });
      }

      return res.status(500).send({
        success: false,
        message: "Houve ume erro interno",
      });
    }
  }

  public static async store(req: Request, res: Response) {
    let { password } = req.body;
    const { email, first_name, last_name } = req.body;

    try {
      const userAlreadyExists = await prisma.user.findFirst({ where: { email } });

      if (userAlreadyExists) {
        throw new CustomError({ message: "Esse usuário já existe", statusCode: 400 });
      }

      password = await bcrypt.hash(password, 8);

      const role = await prisma.role.findFirst({ where: { name: "Neuro", active: true } });
      const user = await prisma.user.create({
        data: { email, password, first_name, last_name, id_role: role.id },
        include: { role: true },
      });

      delete user.password;

      return res.send({
        success: true,
        user,
        token: Authentication.generateToken({ userId: user.id }),
      });
    } catch (error) {
      if (error instanceof CustomError) {
        return res.status(error.statusCode).send({
          success: false,
          message: error.message,
        });
      }

      return res.status(500).send({
        success: false,
        message: "Houve um erro interno",
      });
    }
  }

  public static async update(req: Request, res: Response) {
    const { userId } = req.params;
    const { email, first_name, last_name } = req.body;

    try {
      const userAlreadyExists = await prisma.user.findFirst({
        where: { NOT: { id: userId }, email },
      });

      if (userAlreadyExists) {
        throw new CustomError({ message: "Já existe um usuário com este e-mail", statusCode: 400 });
      }

      const role = await prisma.role.findFirst({ where: { name: "Neuro", active: true } });
      const user = await prisma.user.update({
        where: { id: userId },
        data: { email, first_name, last_name, id_role: role.id },
        include: { role: true },
      });

      if (!user) {
        throw new CustomError({
          message: "Esse usuário não existe",
          statusCode: 400,
        });
      }

      delete user.password;

      return res.send({
        success: true,
        user,
      });
    } catch (error) {
      if (error instanceof CustomError) {
        return res.status(error.statusCode).send({
          success: false,
          message: error.message,
        });
      }

      return res.status(500).send({
        success: false,
        message: "Houve um erro interno",
      });
    }
  }

  public static async delete(req: Request, res: Response) {
    const { userId } = req.params;

    try {
      const user = await prisma.user.findFirst({
        where: { id: userId },
        include: { role: true },
      });

      if (!user) {
        throw new CustomError({
          message: "Esse usuário não existe",
          statusCode: 400,
        });
      }

      if (user.role.name === "Gestor") {
        throw new CustomError({ message: "Você não pode excluir um Gestor", statusCode: 400 });
      }

      await prisma.user.delete({ where: { id: userId } });

      return res.send({
        success: true,
        message: "Colaborador deletado com sucesso!",
      });
    } catch (error) {
      if (error instanceof CustomError) {
        return res.status(error.statusCode).send({
          success: false,
          message: error.message,
        });
      }

      return res.status(500).send({
        success: false,
        message: "Houve um erro interno",
      });
    }
  }

  public static async changeActive(req: Request, res: Response) {
    const { userId } = req.params;

    try {
      const user = await prisma.user.findFirst({
        where: { id: userId },
        include: { role: true },
      });

      if (!user) {
        throw new CustomError({
          message: "Esse usuário não existe",
          statusCode: 400,
        });
      }

      if (user.role.name === "Gestor") {
        throw new CustomError({
          message: "Você não pode alterar o status de um Gestor",
          statusCode: 400,
        });
      }

      await prisma.user.update({ where: { id: userId }, data: { active: !user.active } });

      return res.send({
        success: true,
        message: "Status do colaborador alterado com sucesso!",
      });
    } catch (error) {
      if (error instanceof CustomError) {
        return res.status(error.statusCode).send({
          success: false,
          message: error.message,
        });
      }

      return res.status(500).send({
        success: false,
        message: "Houve um erro interno",
      });
    }
  }

  public static async index(req: Request, res: Response) {
    try {
      const users = await prisma.user.findMany({
        where: { role: { name: "Neuro" } },
        include: { role: true },
      });

      users.forEach((user) => delete user.password);

      return res.send({
        success: true,
        users,
      });
    } catch (error) {
      if (error instanceof CustomError) {
        return res.status(error.statusCode).send({
          success: false,
          message: error.message,
        });
      }

      return res.status(500).send({
        success: false,
        message: "Houve um erro interno",
      });
    }
  }

  public static async show(req: Request, res: Response) {
    const { userId } = req.params;

    try {
      const user = await prisma.user.findFirst({ where: { id: userId }, include: { Tasks: true } });

      delete user.password;

      return res.send({
        success: true,
        user,
      });
    } catch (error) {
      if (error instanceof CustomError) {
        return res.status(error.statusCode).send({
          success: false,
          message: error.message,
        });
      }

      return res.status(500).send({
        success: false,
        message: "Houve um erro interno",
      });
    }
  }
}
