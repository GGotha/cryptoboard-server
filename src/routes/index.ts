import { Router } from "express";

import userRouter from "./user.routes";
import taskRouter from "./task.routes";
import taskHelpRouter from "./task-help.routes";
import avaliationRouter from "./avaliation.routes";

const routes = Router();

routes.use("/user", userRouter);
routes.use("/task", taskRouter);
routes.use("/task-help", taskHelpRouter);
routes.use("/avaliation", avaliationRouter);

export default routes;
