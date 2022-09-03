import { Router } from "express";

import userRouter from "./user.routes";
import coinRouter from "./coin.routes";

const routes = Router();

routes.use("/user", userRouter);
routes.use("/coin", coinRouter);

export default routes;
