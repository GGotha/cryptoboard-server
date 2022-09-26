import { Router } from "express";

import userRouter from "./user.routes";
import taskRouter from "./task.routes";

const routes = Router();

routes.use("/user", userRouter);
routes.use("/task", taskRouter);

export default routes;
