import { db } from "@/lib/db";
import { campaigns, leads, metrics } from "@/lib/db/schema";
import { avg, eq, sql } from "drizzle-orm";
import { Hono } from "hono";

const metricRouter = new Hono();

metricRouter.get("/", async (c) => {
    const data = await db.query.metrics.findMany();

    return c.send({
        data,
    });
});

metricRouter.post("/", async (c) => {
    const totalLeads = await db.$count(leads);
    const convertedLeads = await db.$count(
        leads,
        eq(leads.status, "converted")
    );
    const conversionRate = (convertedLeads / totalLeads) * 100;

    const totalCampaignBudget = await db
        .select({
            value: sql<number>`sum(cast(${campaigns.budget} as integer))`,
        })
        .from(campaigns)
        .then((res) => Number(res[0]?.value) ?? 0);

    const avgLeadsPerCampaign = await db
        .select({
            value: avg(campaigns.leadsAcquired),
        })
        .from(campaigns)
        .then((res) => Number(res[0]?.value) ?? 0);

    const data = await db
        .insert(metrics)
        .values({
            totalLeads,
            convertedLeads,
            conversionRate: conversionRate.toFixed(2),
            totalCampaignBudget,
            avgLeadsPerCampaign: avgLeadsPerCampaign.toFixed(2),
        })
        .returning()
        .then((res) => res[0]);

    return c.send({
        data,
    });
});

export default metricRouter;
