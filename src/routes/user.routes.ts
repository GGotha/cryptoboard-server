import express from "express";
import checkIsGestor from "../middlewares/isGestor";
import { UserController } from "../controllers";
import auth from "../middlewares/authentication";

const userRouter = express.Router();

userRouter.post("/session", UserController.session);

userRouter.use(auth);
userRouter.post("/", checkIsGestor, UserController.store);
userRouter.put("/:userId", checkIsGestor, UserController.update);
userRouter.delete("/:userId", checkIsGestor, UserController.delete);
userRouter.put("/change-active/:userId", checkIsGestor, UserController.changeActive);
userRouter.get("/all", checkIsGestor, UserController.index);
userRouter.get("/:userId", checkIsGestor, UserController.show);

export default userRouter;
