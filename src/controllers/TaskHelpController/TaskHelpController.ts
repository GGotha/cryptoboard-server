import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import CustomError from "../../errors";

const prisma = new PrismaClient();

export class TaskHelpController {
  public static async store(req: Request, res: Response) {
    const { id_task, descricao } = req.body;
    const { userId } = req;

    const taskHelp = await prisma.taskHelp.create({
      data: { id_task, description: descricao, id_user: userId },
    });

    try {
      return res.send({
        success: true,
        taskHelp,
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
