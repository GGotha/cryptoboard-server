import { PrismaClient } from "@prisma/client";
import { format, parseISO } from "date-fns";
import { Request, Response } from "express";
import CustomError from "../../errors";

const prisma = new PrismaClient();

export class TaskController {
  public static async index(req: Request, res: Response) {
    const tasks = await prisma.task.findMany({ include: { taskPriority: true } });

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

    const priorityLevel = await prisma.taskPriority.findFirst({
      where: { name: nivelPrioridade },
    });

    if (!priorityLevel) {
      return res.status(400).send({
        success: false,
        message: "This priority level doesn´t exist",
      });
    }

    const { userId } = req;

    const task = await prisma.task.create({
      data: {
        title: titulo,
        description: descricao,
        final_date: dataFinal,
        id_task_priority: priorityLevel.id,
        id_user: userId,
      },
      include: { taskPriority: true },
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

    const findTask = await prisma.task.findFirst({ where: { id: taskId } });

    if (!findTask) {
      return res.status(400).send({
        success: false,
        message: "Task not exists",
      });
    }

    const priorityLevel = await prisma.taskPriority.findFirst({
      where: { name: nivelPrioridade },
    });

    if (!priorityLevel) {
      return res.status(400).send({
        success: false,
        message: "This priority level doesn´t exist",
      });
    }

    const task = await prisma.task.update({
      where: { id: taskId },
      data: {
        title: titulo,
        description: descricao,
        final_date: dataFinal,
        id_task_priority: priorityLevel.id,
        id_user: userId,
      },
      include: { taskPriority: true },
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

    const findTask = await prisma.task.findFirst({ where: { id: taskId } });

    if (!findTask) {
      return res.status(400).send({
        success: false,
        message: "Task not exists",
      });
    }

    await prisma.task.update({
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

    const formattedDate = format(parseISO(date), "yyyy-MM-dd");

    const formattedDateWithTime = `${formattedDate}T00:00:00.000Z`;

    const tasks = await prisma.task.findMany({
      where: { close_at: formattedDateWithTime },
      include: { taskPriority: true },
    });

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

  public static async priorityOrFinalDate(req: Request, res: Response) {
    let { nivelPrioridade, dataFinal } = req.query;

    nivelPrioridade = nivelPrioridade?.toString();
    dataFinal = dataFinal?.toString();

    let formattedDateWithTime;

    if (dataFinal !== undefined) {
      const formattedDate = format(parseISO(dataFinal), "yyyy-MM-dd");
      formattedDateWithTime = `${formattedDate}T00:00:00.000Z`;
    }

    const priorityLevel = await prisma.taskPriority.findFirst({
      where: { name: nivelPrioridade === undefined ? null : nivelPrioridade },
    });

    formattedDateWithTime = formattedDateWithTime === undefined ? null : formattedDateWithTime;

    const tasks = await prisma.task.findMany({
      where: {
        OR: [{ id_task_priority: priorityLevel?.id }, { close_at: formattedDateWithTime }],
      },
      include: { taskPriority: true },
    });

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
