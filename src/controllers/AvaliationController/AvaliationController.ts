import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import CustomError from "../../errors";

const prisma = new PrismaClient();

export class AvaliationController {
  public static async store(req: Request, res: Response) {
    const { descricao } = req.body;
    const { userId } = req;

    const avaliation = await prisma.avaliation.create({
      data: { description: descricao, id_user: userId },
    });

    try {
      return res.send({
        success: true,
        avaliation,
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
    const avaliations = await prisma.avaliation.findMany({
      include: { user: true },
    });

    avaliations.forEach((avaliation) => delete avaliation.user.password);

    try {
      return res.send({
        success: true,
        avaliations,
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
