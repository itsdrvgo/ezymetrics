import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
    server: {
        PORT: z
            .string()
            .transform((v) => parseInt(v, 10))
            .default("3001"),

        DATABASE_URL: z.string().min(1, "DATABASE_URL is required"),

        EMAIL_HOST: z.string().min(1, "EMAIL_HOST is required"),
        EMAIL_PORT: z
            .string()
            .transform((v) => parseInt(v, 10))
            .default("587"),
        EMAIL_SECURE: z.string().transform((v) => v === "true"),
        EMAIL_USER: z.string().min(1, "EMAIL_USER is required"),
        EMAIL_PASS: z.string().min(1, "EMAIL_PASS is required"),
        EMAIL_FROM_NAME: z.string().min(1, "EMAIL_FROM_NAME is required"),
        EMAIL_FROM_ADDRESS: z.string().min(1, "EMAIL_FROM_ADDRESS is required"),

        NODE_ENV: z.enum(["development", "production"]).default("development"),
    },
    runtimeEnv: process.env,
    emptyStringAsUndefined: true,
});
