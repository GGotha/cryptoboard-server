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

      const role = await prisma.role.findFirst({ where: { name: "User", active: true } });
      const user = await prisma.user.create({
        data: { email, password, first_name, last_name, id_role: role.id },
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
}
