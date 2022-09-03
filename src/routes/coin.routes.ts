import express from "express";
import { CoinController } from "../controllers";

const coinRouter = express.Router();

coinRouter.get("/all", CoinController.index);
coinRouter.get("/:coin", CoinController.show);

export default coinRouter;
