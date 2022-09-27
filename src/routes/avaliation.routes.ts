import express from "express";
import checkIsNeuro from "../middlewares/isNeuro";
import { AvaliationController } from "../controllers";
import auth from "../middlewares/authentication";

const avaliationRouter = express.Router();

avaliationRouter.use(auth);

avaliationRouter.post("/", checkIsNeuro, AvaliationController.store);

export default avaliationRouter;
