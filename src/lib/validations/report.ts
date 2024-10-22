import { z } from "zod";

export const reportUserSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email"),
});

export type ReportUser = z.infer<typeof reportUserSchema>;
