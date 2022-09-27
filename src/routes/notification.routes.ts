import express from "express";
import checkIsNeuro from "../middlewares/isNeuro";
import { NotificationController } from "../controllers";
import auth from "../middlewares/authentication";

const notificationRouter = express.Router();

notificationRouter.use(auth);

notificationRouter.post("/", checkIsNeuro, NotificationController.store);

export default notificationRouter;
