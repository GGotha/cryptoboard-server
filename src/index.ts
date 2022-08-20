import path from "path";
import dotenv from "dotenv";

process.env.NODE_ENV = process.env.NODE_ENV || "development";

dotenv.config({
  path: path.resolve(__dirname, "..", ".env." + process.env.NODE_ENV),
});

import Server from "./server";

new Server();
