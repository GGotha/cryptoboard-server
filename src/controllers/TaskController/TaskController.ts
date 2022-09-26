import { PrismaClient } from "@prisma/client";
import { format, parseISO } from "date-fns";
import { Request, Response } from "express";
import CustomError from "../../errors";

const prisma = new PrismaClient();

export class TaskController {
  public static async index(req: Request, res: Response) {
    const tasks = await prisma.tasks.findMany();

    try {
      return res.send({
        success: true,
        tasks,
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

    const findTask = await prisma.tasks.findFirst({ where: { id: taskId } });

    if (!findTask) {
      return res.status(400).send({
        success: false,
        message: "Task not exists",
      });
    }

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
    const { descricao_fechamento } = req.body;

    const findTask = await prisma.tasks.findFirst({ where: { id: taskId } });

    if (!findTask) {
      return res.status(400).send({
        success: false,
        message: "Task not exists",
      });
    }

    await prisma.tasks.update({
      where: { id: taskId },
      data: { extra_description: descricao_fechamento, close_at: new Date() },
    });

    try {
      return res.send({
        success: true,
        message: "Task was closed",
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

  public static async closedByDate(req: Request, res: Response) {
    const { date } = req.params;

    const formattedDate: string = format(parseISO(date), "yyyy-MM-dd");

    const formattedDateWithTime = `${formattedDate}T00:00:00.000Z`;

    const tasks = await prisma.tasks.findMany({ where: { close_at: formattedDateWithTime } });

    try {
      return res.send({
        success: true,
        tasks,
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
