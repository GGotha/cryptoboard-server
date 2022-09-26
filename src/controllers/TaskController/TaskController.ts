import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import CustomError from "../../errors";

const prisma = new PrismaClient();

export class TaskController {
  public static async store(req: Request, res: Response) {
    const { titulo, descricao, dataFinal, nivelPrioridade } = req.body;

    const { userId } = req;

    const task = await prisma.tasks.create({
      data: {
        title: titulo,
        description: descricao,
        final_date: dataFinal,
        priority_level: nivelPrioridade,
        id_user: userId,
      },
    });

    try {
      return res.send({
        success: true,
        task,
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
    const { taskId } = req.params;
    const { titulo, descricao, dataFinal, nivelPrioridade } = req.body;

    const { userId } = req;

    const task = await prisma.tasks.update({
      where: { id: taskId },
      data: {
        title: titulo,
        description: descricao,
        final_date: dataFinal,
        priority_level: nivelPrioridade,
        id_user: userId,
      },
    });

    try {
      return res.send({
        success: true,
        task,
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
    const { taskId } = req.params;

    await prisma.tasks.delete({
      where: { id: taskId },
    });

    try {
      return res.send({
        success: true,
        message: "Task was deleted",
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
