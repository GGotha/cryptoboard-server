import { Request, Response } from "express";
import Coingecko, { Coin } from "../../classes/Coingecko";
import CustomError from "../../errors";

export class CoinController {
  public static async index(req: Request, res: Response) {
    const coins: Coin[] = await Coingecko.getAllCoins();

    try {
      return res.send({
        success: true,
        coins,
      });
    } catch (error) {
      if (error instanceof CustomError) {
        return res.status(error.statusCode).send({
          success: false,
          message: error.message,
        });
      }

      return res.status(500).send({
        success: false,
        message: "Houve ume erro interno",
      });
    }
  }

  public static async show(req: Request, res: Response) {
    const { coin } = req.params;

    const coinData = await Coingecko.getSpecificCoin({ coin });

    try {
      return res.send({
        success: true,
        coin: coinData,
      });
    } catch (error) {
      if (error instanceof CustomError) {
        return res.status(error.statusCode).send({
          success: false,
          message: error.message,
        });
      }

      return res.status(500).send({
        success: false,
        message: "Houve ume erro interno",
      });
    }
  }
}
