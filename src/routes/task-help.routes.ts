import express from "express";
import checkIsNeuro from "../middlewares/isNeuro";
import { TaskHelpController } from "../controllers";
import auth from "../middlewares/authentication";

const taskHelpRouter = express.Router();

taskHelpRouter.use(auth);

taskHelpRouter.post("/", checkIsNeuro, TaskHelpController.store);

export default taskHelpRouter;
