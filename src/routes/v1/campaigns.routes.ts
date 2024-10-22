import { db } from "@/lib/db";
import { campaigns } from "@/lib/db/schema";
import { cFetch } from "@/lib/utils";
import { campaignSchema } from "@/lib/validations";
import { Hono } from "hono";

const campaignRouter = new Hono();

campaignRouter.get("/", async (c) => {
    const data = await cFetch("http://localhost:3001/assets/campaigns.json");

    const parsed = campaignSchema
        .omit({
            createdAt: true,
            updatedAt: true,
        })
        .array()
        .parse(data);

    return c.send({
        data: parsed,
    });
});

campaignRouter.post("/", async (c) => {
    const data = await cFetch("http://localhost:3001/assets/campaigns.json");

    const parsed = campaignSchema
        .omit({
            createdAt: true,
            updatedAt: true,
        })
        .array()
        .parse(data);
    if (!parsed.length) c.throw("No campaigns found", "NOT_FOUND");

    const newCampaigns = await db.insert(campaigns).values(parsed).returning();

    return c.send({
        data: newCampaigns,
    });
});

// eslint-disable-next-line drizzle/enforce-delete-with-where
campaignRouter.delete("/", async (c) => {
    // eslint-disable-next-line drizzle/enforce-delete-with-where
    await db.delete(campaigns);

    return c.send();
});

export default campaignRouter;
