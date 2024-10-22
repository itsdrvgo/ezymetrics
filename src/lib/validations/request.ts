import { z } from "zod";

export const queryReportTypeSchema = z.object({
    type: z.enum(["csv", "pdf"]).default("csv"),
});

export type QueryReportType = z.infer<typeof queryReportTypeSchema>;
