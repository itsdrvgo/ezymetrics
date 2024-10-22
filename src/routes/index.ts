import { Hono } from "hono";
import { v1Router } from "./v1";

const apiRouter = new Hono();

apiRouter.route("/v1", v1Router);

export { apiRouter };
