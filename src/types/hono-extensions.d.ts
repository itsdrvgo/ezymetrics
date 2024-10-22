import type { ResponseMessages } from "@/lib/validations";

declare module "hono" {
    interface Context {
        send<T>(options?: {
            message?: ResponseMessages;
            longMessage?: string;
            data?: T;
        }): Response;
        handle(err: unknown): Response;
        throw(message: string, status: ResponseMessages): never;
    }
}
