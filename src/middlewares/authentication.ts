import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface TokenPayload {
  iat: number;
  exp: number;
  sub: {
    userId: number;
  };
}

export default function auth(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).send({ success: false, msg: "Invalid Token" });
  }

  const [, token] = authHeader.split(" ");

  try {
    const decoded = verify(token, process.env.JWT_SECRET);

    const { sub } = decoded as unknown as TokenPayload;

    req.userId = sub.userId;

    return next();
  } catch (err) {
    return res.status(401).send({ success: false, msg: "Invalid Token" });
  }
}
