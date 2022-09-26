import express from "express";
import checkIsNeuro from "../middlewares/isNeuro";
import { TaskController } from "../controllers";
import auth from "../middlewares/authentication";

const taskRouter = express.Router();

taskRouter.use(auth);

taskRouter.get("/", checkIsNeuro, TaskController.index);
taskRouter.post("/", checkIsNeuro, TaskController.store);
taskRouter.put("/:taskId", checkIsNeuro, TaskController.update);
taskRouter.delete("/:taskId", checkIsNeuro, TaskController.delete);
taskRouter.get("/closed-by-date/:date", checkIsNeuro, TaskController.closedByDate);

export default taskRouter;
