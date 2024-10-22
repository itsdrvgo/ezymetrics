import nodemailer from "nodemailer";
import type SMTPPool from "nodemailer/lib/smtp-pool";

export type Transporter = nodemailer.Transporter<SMTPPool.SentMessageInfo>;
