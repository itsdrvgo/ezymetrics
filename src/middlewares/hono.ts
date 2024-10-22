import { HonoError, sanitizeError } from "@/lib/utils";
import type { ResponseMessages } from "@/lib/validations";
import { DrizzleError } from "drizzle-orm";
import { createFactory } from "hono/factory";
import type { StatusCode } from "hono/utils/http-status";
import { ZodError } from "zod";

const factory = createFactory();

export const honoHandleErrorMiddleware = factory.createMiddleware(
    async (c, next) => {
        c.handle = (err: unknown) => {
            if (err instanceof HonoError)
                return c.send({
                    message: err.status,
                    longMessage: sanitizeError(err),
                });
            if (err instanceof ZodError)
                return c.send({
                    message: "BAD_REQUEST",
                    longMessage: sanitizeError(err),
                });
            if (err instanceof DrizzleError)
                return c.send({
                    message: "BAD_REQUEST",
                    longMessage: sanitizeError(err),
                });
            if (err instanceof Error)
                return c.send({
                    message: "ERROR",
                    longMessage: sanitizeError(err),
                });
            else
                return c.send({
                    message: "INTERNAL_SERVER_ERROR",
                    longMessage: sanitizeError(err),
                });
        };

        await next();
    }
);

export const honoSendResponseMiddleware = factory.createMiddleware(
    async (c, next) => {
        c.send = <T>(
            {
                message = "OK",
                longMessage,
                data,
            }: {
                message?: ResponseMessages;
                longMessage?: string;
                data?: T;
            } = {
                message: "OK",
            }
        ) => {
            let code: StatusCode;
            let status = false;

            switch (message) {
                case "OK":
                    code = 200;
                    status = true;
                    break;
                case "ERROR":
                    code = 400;
                    break;
                case "UNAUTHORIZED":
                    code = 401;
                    break;
                case "FORBIDDEN":
                    code = 403;
                    break;
                case "NOT_FOUND":
                    code = 404;
                    break;
                case "BAD_REQUEST":
                    code = 400;
                    break;
                case "CONFLICT":
                    code = 409;
                    break;
                case "TOO_MANY_REQUESTS":
                    code = 429;
                    break;
                case "INTERNAL_SERVER_ERROR":
                    code = 500;
                    break;
                case "SERVICE_UNAVAILABLE":
                    code = 503;
                    break;
                case "GATEWAY_TIMEOUT":
                    code = 504;
                    break;
                case "UNKNOWN_ERROR":
                    code = 500;
                    break;
                case "UNPROCESSABLE_ENTITY":
                    code = 422;
                    break;
                case "NOT_IMPLEMENTED":
                    code = 501;
                    break;
                case "CREATED":
                    code = 201;
                    status = true;
                    break;
                case "BAD_GATEWAY":
                    code = 502;
                    break;
                default:
                    code = 500;
                    break;
            }

            return c.json(
                {
                    status,
                    longMessage,
                    data,
                },
                code
            );
        };

        await next();
    }
);

export const honoThrowErrorMiddleware = factory.createMiddleware(
    async (c, next) => {
        c.throw = (message: string, status: ResponseMessages) => {
            throw new HonoError(message, status);
        };

        await next();
    }
);
