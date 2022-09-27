import express from "express";
import checkIsNeuro from "../middlewares/isNeuro";
import { TaskHelpController } from "../controllers";
import auth from "../middlewares/authentication";
import checkIsGestor from "../middlewares/isGestor";

const taskHelpRouter = express.Router();

taskHelpRouter.use(auth);

taskHelpRouter.post("/", checkIsNeuro, TaskHelpController.store);
taskHelpRouter.get("/all", checkIsGestor, TaskHelpController.index);

export default taskHelpRouter;
