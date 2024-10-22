import { format } from "date-fns";
import { z } from "zod";

export const campaignSchema = z.object({
    id: z.string().length(24, "Id must be 24 characters long"),
    name: z.string().min(3, "Name must be at least 3 characters long"),
    budget: z.string().min(1, "Budget must be at least 1 character long"),
    leadsAcquired: z.number().int(),
    startDate: z.string().transform((v) => new Date(v)),
    endDate: z.string().transform((v) => new Date(v)),
    createdAt: z
        .string()
        .transform((v) => new Date(v))
        .default(new Date().toISOString()),
    updatedAt: z
        .string()
        .transform((v) => new Date(v))
        .default(new Date().toISOString()),
});

export const reportCampaignSchema = z.object({
    id: campaignSchema.shape.id,
    name: campaignSchema.shape.name,
    budget: campaignSchema.shape.budget,
    leadsAcquired: campaignSchema.shape.leadsAcquired,
    startDate: z.date().transform((v) => format(v, "dd/MM/yyyy")),
    endDate: z.date().transform((v) => format(v, "dd/MM/yyyy")),
    createdAt: z.date().transform((v) => format(v, "dd/MM/yyyy")),
});

export type Campaign = z.infer<typeof campaignSchema>;
export type ReportCampaign = z.infer<typeof reportCampaignSchema>;
