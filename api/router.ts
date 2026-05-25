import { createRouter, publicQuery } from "./middleware";
import { scrapeRouter } from "./scrapeRouter";

export const appRouter = createRouter({
  ping: publicQuery.query(() => ({ ok: true, ts: Date.now() })),
  scrape: scrapeRouter,
});

export type AppRouter = typeof appRouter;
