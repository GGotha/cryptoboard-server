import { Router } from "express";

import userRouter from "./user.routes";
import taskRouter from "./task.routes";
import taskHelpRouter from "./task-help.routes";

const routes = Router();

routes.use("/user", userRouter);
routes.use("/task", taskRouter);
routes.use("/task-help", taskHelpRouter);

export default routes;
