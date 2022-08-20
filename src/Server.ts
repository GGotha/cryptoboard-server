import express, { Express, Request, Response } from "express";

import path from "path";
import dotenv from "dotenv";

import bodyParser from "body-parser";
import Youch from "youch";
import helmet from "helmet";
import InvalidRoutes from "./routes/invalid.routes";
import Routes from "./routes";

process.env.NODE_ENV = process.env.NODE_ENV || "development";

dotenv.config({
  path: path.resolve(__dirname, "..", "..", `.env.${process.env.NODE_ENV}`),
});

export default class Server {
  public express: Express;

  public constructor() {
    this.express = express();

    this.middlewares();
    this.routes();
    this.invalidRoutes();
    this.exception();

    this.createHTTPServer();
  }

  private middlewares(): void {
    this.express.use(helmet());
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: false }));
  }

  private routes(): void {
    this.express.use(Routes);
  }

  private invalidRoutes(): void {
    this.express.use(InvalidRoutes);
  }

  private exception(): void {
    this.express.use(async (err: Error, req: Request, res: Response) => {
      let message: any = "Internal Server Error";

      if (process.env.NODE_ENV !== "production") {
        const youch = new Youch(err, req);
        message = await youch.toJSON();
      }

      return res.status(500).send({ success: false, message });
    });
  }

  private createHTTPServer(): void {
    this.express.listen(process.env.PORT);
    // eslint-disable-next-line no-console
    console.log(`🚀 Server running at port ${process.env.PORT} 🚀`);
  }
}
