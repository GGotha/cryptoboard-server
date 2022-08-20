import path from "path";
import dotenv from "dotenv";

import Server from "./Server";

process.env.NODE_ENV = process.env.NODE_ENV || "development";

dotenv.config({
  path: path.resolve(__dirname, "..", `.env.${process.env.NODE_ENV}`),
});

// eslint-disable-next-line no-new
new Server();
