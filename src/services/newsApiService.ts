import { Axios } from "axios";
import { NewsResp } from "../interfaces";

export class NewsApi {
  private static client = new Axios({
    baseURL: "https://newsdata.io/api",
    headers: {
      "X-ACCESS-KEY": Bun.env.NEWS_KEY,
    },
  });

  static async searchNews(page?: string): Promise<NewsResp> {
    let url = "/1/latest?country=co&language=es&removeduplicate=1";
    if (page) {
      url += `&page=${page}`;
    }
    const { data } = await this.client.get(url);
    return JSON.parse(data);
  }
}
