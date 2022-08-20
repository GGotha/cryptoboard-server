import express from "express";
import { UserController } from "../controllers";

const userRouter = express.Router();

userRouter.post("/session", UserController.session);
userRouter.post("/", UserController.store);

export default userRouter;
