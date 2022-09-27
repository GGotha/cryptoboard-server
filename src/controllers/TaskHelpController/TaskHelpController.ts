import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import CustomError from "../../errors";

const prisma = new PrismaClient();

export class TaskHelpController {
  public static async store(req: Request, res: Response) {
    const { id_task, descricao } = req.body;
    const { userId } = req;

    try {
      const task = await prisma.task.findFirst({ where: { id: id_task } });

      if (!task) {
        throw new CustomError({
          message: "Essa tarefa não existe",
          statusCode: 400,
        });
      }

      const taskHelp = await prisma.taskHelp.create({
        data: { id_task, description: descricao, id_user: userId },
      });

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

  public static async index(req: Request, res: Response) {
    const taskHelps = await prisma.taskHelp.findMany({
      include: { task: { include: { user: true, taskPriority: true } }, user: true },
    });

    taskHelps.forEach((taskHelp) => {
      delete taskHelp.task.user.password;
      delete taskHelp.user.password;
    });

    try {
      return res.send({
        success: true,
        taskHelps,
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
