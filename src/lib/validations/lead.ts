import { format } from "date-fns";
import { z } from "zod";

export const leadSchema = z.object({
    id: z.string().length(24, "Id must be 24 characters long"),
    name: z.string().min(3, "Name must be at least 3 characters long"),
    email: z.string().email("Invalid email"),
    status: z.string().min(3, "Status must be at least 3 characters long"),
    createdAt: z
        .string()
        .transform((v) => new Date(v))
        .default(new Date().toISOString()),
    updatedAt: z
        .string()
        .transform((v) => new Date(v))
        .default(new Date().toISOString()),
});

export const reportLeadSchema = z.object({
    id: leadSchema.shape.id,
    name: leadSchema.shape.name,
    email: leadSchema.shape.email,
    status: leadSchema.shape.status.transform(
        (v) => v[0]?.toUpperCase() + v.slice(1)
    ),
    createdAt: z.date().transform((v) => format(v, "dd/MM/yyyy")),
});

export type Lead = z.infer<typeof leadSchema>;
export type ReportLead = z.infer<typeof reportLeadSchema>;
