import { env } from "@/env";
import type { Transporter } from "@/types";
import { render } from "@react-email/components";
import type Mail from "nodemailer/lib/mailer";
import { ReportCampaigns, ReportLeads, ReportMetric } from "./templates";
import { transporter } from "./transporter";

class Mailer {
    transporter: Transporter;
    from: {
        name: string;
        address: string;
    };

    constructor(transporter: Transporter) {
        this.transporter = transporter;

        this.from = {
            name: env.EMAIL_FROM_NAME,
            address: env.EMAIL_FROM_ADDRESS,
        };
    }

    sendLeadsReport = async (
        user: {
            name: string;
            email: string;
        },
        attachments: Mail.Options["attachments"]
    ) => {
        const html = await render(<ReportLeads name={user.name} />);

        await transporter.sendMail({
            from: {
                name: env.EMAIL_FROM_NAME,
                address: env.EMAIL_FROM_ADDRESS,
            },
            to: [
                {
                    name: user.name,
                    address: user.email,
                },
            ],
            subject: "Report of leads generated",
            html,
            attachments,
        });
    };

    sendCampaignReport = async (
        user: {
            name: string;
            email: string;
        },
        attachments: Mail.Options["attachments"]
    ) => {
        const html = await render(<ReportCampaigns name={user.name} />);

        await transporter.sendMail({
            from: {
                name: env.EMAIL_FROM_NAME,
                address: env.EMAIL_FROM_ADDRESS,
            },
            to: [
                {
                    name: user.name,
                    address: user.email,
                },
            ],
            subject: "Report of campaigns generated",
            html,
            attachments,
        });
    };

    sendMetricsReport = async (
        user: {
            name: string;
            email: string;
        },
        attachments: Mail.Options["attachments"]
    ) => {
        const html = await render(<ReportMetric name={user.name} />);

        await transporter.sendMail({
            from: {
                name: env.EMAIL_FROM_NAME,
                address: env.EMAIL_FROM_ADDRESS,
            },
            to: [
                {
                    name: user.name,
                    address: user.email,
                },
            ],
            subject: "Report of metrics generated",
            html,
            attachments,
        });
    };
}

export const mailer = new Mailer(transporter);
