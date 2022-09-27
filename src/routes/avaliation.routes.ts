import express from "express";
import checkIsNeuro from "../middlewares/isNeuro";
import { AvaliationController } from "../controllers";
import auth from "../middlewares/authentication";
import checkIsGestor from "../middlewares/isGestor";

const avaliationRouter = express.Router();

avaliationRouter.use(auth);

avaliationRouter.post("/", checkIsNeuro, AvaliationController.store);
avaliationRouter.get("/all", checkIsGestor, AvaliationController.index);

export default avaliationRouter;
