import { db } from "@/lib/db";
import { mailer } from "@/lib/mailer";
import { generatePdf } from "@/lib/pdf";
import { convertObjectKeysToLabels } from "@/lib/utils";
import {
    queryReportTypeSchema,
    reportCampaignSchema,
    reportLeadSchema,
    reportMetricSchema,
    reportUserSchema,
} from "@/lib/validations";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { json2csv } from "json-2-csv";

const reportRouter = new Hono();

reportRouter.post(
    "/leads",
    zValidator("json", reportUserSchema),
    zValidator("query", queryReportTypeSchema),
    async (c) => {
        const type = c.req.valid("query").type;

        const allLeads = await db.query.leads.findMany();
        const parsed = reportLeadSchema.array().parse(allLeads);

        const converted = parsed.map((lead) => convertObjectKeysToLabels(lead));

        switch (type) {
            case "csv": {
                const csv = json2csv(converted);

                c.header("Content-Type", "text/csv");
                c.header(
                    "Content-Disposition",
                    "attachment; filename=leads_report.csv"
                );

                return c.body(csv);
            }

            case "pdf": {
                const { email, name } = c.req.valid("json");

                const { buffer: content } = await generatePdf(
                    "Leads Report",
                    ["Name", "Email", "Status", "Created At"],
                    parsed.map((lead) => ({
                        name: lead.name,
                        email: lead.email,
                        status: lead.status,
                        createdAt: lead.createdAt,
                    })),
                    [50, 170, 350, 450]
                );

                mailer.sendLeadsReport(
                    {
                        name,
                        email,
                    },
                    [
                        {
                            filename: "leads_report.pdf",
                            content,
                            contentType: "application/pdf",
                            contentDisposition: "attachment",
                        },
                    ]
                );

                c.header("Content-Type", "application/pdf");
                c.header(
                    "Content-Disposition",
                    "attachment; filename=leads_report.pdf"
                );

                return c.send({
                    longMessage: "The report will be sent to your email soon",
                });
            }
        }
    }
);

reportRouter.post(
    "/campaigns",
    zValidator("json", reportUserSchema),
    zValidator("query", queryReportTypeSchema),
    async (c) => {
        const type = c.req.valid("query").type;

        const allCampaigns = await db.query.campaigns.findMany();
        const parsed = reportCampaignSchema.array().parse(allCampaigns);

        const converted = parsed.map((campaign) =>
            convertObjectKeysToLabels(campaign)
        );

        switch (type) {
            case "csv": {
                const csv = json2csv(converted);

                c.header("Content-Type", "text/csv");
                c.header(
                    "Content-Disposition",
                    "attachment; filename=campaigns_report.csv"
                );

                return c.body(csv);
            }

            case "pdf": {
                const { email, name } = c.req.valid("json");

                const { buffer: content } = await generatePdf(
                    "Campaigns Report",
                    ["Name", "Budget", "Leads", "Start Date", "End Date"],
                    parsed.map((campaign) => ({
                        name: campaign.name,
                        budget: campaign.budget,
                        leadsAcquired: String(campaign.leadsAcquired),
                        startDate: campaign.startDate,
                        endDate: campaign.endDate,
                    })),
                    [50, 200, 280, 350, 450]
                );

                c.header("Content-Type", "application/pdf");
                c.header(
                    "Content-Disposition",
                    "attachment; filename=campaigns_report.pdf"
                );

                mailer.sendCampaignReport(
                    {
                        name,
                        email,
                    },
                    [
                        {
                            filename: "campaigns_report.pdf",
                            content,
                            contentType: "application/pdf",
                            contentDisposition: "attachment",
                        },
                    ]
                );

                return c.send({
                    longMessage: "The report will be sent to your email soon",
                });
            }
        }
    }
);

reportRouter.post(
    "/metrics",
    zValidator("json", reportUserSchema),
    zValidator("query", queryReportTypeSchema),
    async (c) => {
        const type = c.req.valid("query").type;

        const allMetrics = await db.query.metrics.findMany();
        const parsed = reportMetricSchema.array().parse(allMetrics);

        const converted = parsed.map((metric) =>
            convertObjectKeysToLabels(metric)
        );

        switch (type) {
            case "csv": {
                const csv = json2csv(converted);

                c.header("Content-Type", "text/csv");
                c.header(
                    "Content-Disposition",
                    "attachment; filename=metrics_report.csv"
                );

                return c.body(csv);
            }

            case "pdf": {
                const { email, name } = c.req.valid("json");

                const { buffer: content } = await generatePdf(
                    "Metrics Report",
                    [
                        "Leads (T)",
                        "Leads (C)",
                        "Conversion Rate",
                        "Budget (T)",
                        "Leads/Campaign",
                        "Created At",
                    ],
                    parsed.map((metric) => ({
                        totalLeads: String(metric.totalLeads),
                        convertedLeads: String(metric.convertedLeads),
                        conversionRate: metric.conversionRate,
                        totalCampaignBudget: String(metric.totalCampaignBudget),
                        avgLeadsPerCampaign: String(metric.avgLeadsPerCampaign),
                        createdAt: metric.createdAt,
                    })),
                    [50, 120, 190, 290, 360, 470]
                );

                c.header("Content-Type", "application/pdf");
                c.header(
                    "Content-Disposition",
                    "attachment; filename=metrics_report.pdf"
                );

                mailer.sendMetricsReport(
                    {
                        name,
                        email,
                    },
                    [
                        {
                            filename: "metrics_report.pdf",
                            content,
                            contentType: "application/pdf",
                            contentDisposition: "attachment",
                        },
                    ]
                );

                return c.send({
                    longMessage: "The report will be sent to your email soon",
                });
            }
        }
    }
);

export default reportRouter;
