import { format } from "date-fns";
import { z } from "zod";

export const metricSchema = z.object({
    id: z.string().length(24, "Id must be 24 characters long"),
    totalLeads: z.number().int(),
    convertedLeads: z.number().int(),
    conversionRate: z.string().transform((v) => `${+v}%`),
    totalCampaignBudget: z.number().int(),
    avgLeadsPerCampaign: z.string().transform((v) => +v),
    createdAt: z.date(),
    updatedAt: z.date(),
});

export const reportMetricSchema = z.object({
    id: metricSchema.shape.id,
    totalLeads: metricSchema.shape.totalLeads,
    convertedLeads: metricSchema.shape.convertedLeads,
    conversionRate: metricSchema.shape.conversionRate,
    totalCampaignBudget: metricSchema.shape.totalCampaignBudget,
    avgLeadsPerCampaign: metricSchema.shape.avgLeadsPerCampaign,
    createdAt: z.date().transform((v) => format(v, "dd/MM/yyyy")),
});

export type Metric = z.infer<typeof metricSchema>;
export type ReportMetric = z.infer<typeof reportMetricSchema>;
