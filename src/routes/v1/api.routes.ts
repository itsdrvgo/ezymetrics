import { Hono } from "hono";
import campaignRouter from "./campaigns.routes";
import leadRouter from "./leads.routes";
import metricRouter from "./metrics.routes";
import reportRouter from "./reports.routes";

const v1Router = new Hono();

v1Router.route("/campaigns", campaignRouter);
v1Router.route("/leads", leadRouter);
v1Router.route("/metrics", metricRouter);
v1Router.route("/reports", reportRouter);

export { v1Router };
