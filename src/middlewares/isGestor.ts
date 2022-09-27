import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

const prisma = new PrismaClient();

interface TokenPayload {
  iat: number;
  exp: number;
  sub: {
    userId: any;
  };
}

export default async function checkIsGestor(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  const [, token] = authHeader.split(" ");

  try {
    const decoded = verify(token, process.env.JWT_SECRET);

    const { sub } = decoded as unknown as TokenPayload;

    req.userId = sub.userId as any;

    const user = await prisma.user.findFirst({
      where: { id: req.userId },
      include: { role: true },
    });

    if (user.role.name !== "Gestor") {
      return res.status(401).send({ success: false, message: "Permission Denied" });
    }

    return next();
  } catch (err) {
    return res.status(401).send({ success: false, message: "Invalid Token" });
  }
}
