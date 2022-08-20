import UserController from "../controllers/UserController";
import express from "express";
import handler from "express-async-handler";

const userRouter = express.Router();

userRouter.post("/session", handler(UserController.session));
userRouter.post("/", handler(UserController.store));

export default userRouter;
