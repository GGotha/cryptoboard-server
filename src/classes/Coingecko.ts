import axios from "axios";

export type Coin = {
  name: string;
  symbol: string;
  image: {
    thumb: string;
  };
  price: {
    brl: string;
    usd: string;
    brlPercentage24h: string;
    usdPercentage24h: string;
  };
};

export default class Coingecko {
  private static URL = "https://api.coingecko.com/api/v3";

  public static async getAllCoins(): Promise<Coin[]> {
    const response = await axios.get(`${this.URL}/coins`);

    const data: Coin[] = response.data.map((coin) => ({
      name: coin.name,
      symbol: coin.symbol,
      image: coin.image,
      price: {
        brl: coin.market_data.current_price.brl,
        usd: coin.market_data.current_price.usd,
        brlPercentage24h: coin.market_data.price_change_percentage_24h_in_currency.brl,
        usdPercentage24h: coin.market_data.price_change_percentage_24h_in_currency.usd,
      },
    }));

    return data;
  }

  public static async getSpecificCoin({ coin }): Promise<Coin> {
    const response = await axios.get(`${this.URL}/coins/${coin}`);

    const { name, symbol, image, market_data } = response.data;

    const data: Coin = {
      name,
      symbol,
      image,
      price: {
        brl: market_data.current_price.brl,
        usd: market_data.current_price.usd,
        brlPercentage24h: market_data.price_change_percentage_24h_in_currency.brl,
        usdPercentage24h: market_data.price_change_percentage_24h_in_currency.usd,
      },
    };

    return data;
  }
}
