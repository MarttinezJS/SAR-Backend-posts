import { CronJob } from "cron";
import { NewsApi } from "./newsApiService";
import { News, NewsResp } from "../interfaces";
import { openPrisma } from "./openPrisma";
import prismaClient from "../helpers/prismaClient";
import { sleep } from "bun";

export const fetchNews = CronJob.from({
  cronTime: "* */30 * * * *",
  onTick: async () => {
    const now = new Date(Date.now());
    console.info(
      `====================== ${now.toLocaleString()} ======================`,
    );
    const news: News[] = [];
    let count = 0;
    let resp: NewsResp | undefined = undefined;
    do {
      const nextPage = resp?.nextPage;
      resp = await NewsApi.searchNews(nextPage);
      console.info(
        `${resp.status} | Se solicitaron ${resp.results.length} noticias.`,
      );
      news.push(...resp.results);
      count++;
      await sleep(2645);
    } while (count < 4);

    const { isError, message } = await openPrisma(async () => {
      const saved = await prismaClient.noticias.createMany({
        data: news.map((n) => ({
          articleId: n.article_id,
          title: n.title,
          abstract: n.description,
          imageUrl: n.image_url,
          videoUrl: n.video_url,
          createdDate: new Date(n.pubDate),
          link: n.link,
          sourceName: n.source_name,
          sourceLink: n.source_url,
          sourceIcon: n.source_icon,
        })),
        skipDuplicates: true,
      });

      console.info(`Registradas ${saved.count} noticias.`);
      return [];
    });

    if (isError) {
      console.log(message);
    }
  },
  start: false,
  timeZone: "America/Bogota",
  waitForCompletion: true,
  runOnInit: true,
});
