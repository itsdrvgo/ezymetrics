import { env } from "@/env";
import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
    pool: true,
    host: env.EMAIL_HOST,
    port: env.EMAIL_PORT,
    secure: env.EMAIL_SECURE,
    auth: {
        user: env.EMAIL_USER,
        pass: env.EMAIL_PASS,
    },
    tls: {
        servername: env.EMAIL_HOST,
    },
});
