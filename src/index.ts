import { env } from "@/env";
import { Hono } from "hono";
import { serveStatic } from "hono/bun";
import { cors } from "hono/cors";
import { showRoutes } from "hono/dev";
import { logger } from "hono/logger";
import {
    honoHandleErrorMiddleware,
    honoSendResponseMiddleware,
    honoThrowErrorMiddleware,
} from "./middlewares";
import { apiRouter } from "./routes";

const app = new Hono()
    .use(
        "/assets/*",
        serveStatic({
            root: "/",
        })
    )
    .basePath("/api")
    .use(logger())
    .use(
        "*",
        honoSendResponseMiddleware,
        honoHandleErrorMiddleware,
        honoThrowErrorMiddleware
    )
    .use("/api/*", cors())
    .route("/", apiRouter)
    .onError((err, c) => c.handle(err));

showRoutes(app);

export default {
    port: env.PORT,
    fetch: app.fetch,
};
