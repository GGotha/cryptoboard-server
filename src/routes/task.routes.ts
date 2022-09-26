import express from "express";
import checkIsNeuro from "../middlewares/isNeuro";
import { TaskController } from "../controllers";
import auth from "../middlewares/authentication";

const taskRouter = express.Router();

taskRouter.use(auth);

taskRouter.post("/", checkIsNeuro, TaskController.store);
taskRouter.put("/:taskId", checkIsNeuro, TaskController.update);
taskRouter.delete("/:taskId", checkIsNeuro, TaskController.delete);

export default taskRouter;
