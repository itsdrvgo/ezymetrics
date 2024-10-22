import { db } from "@/lib/db";
import { leads } from "@/lib/db/schema";
import { cFetch } from "@/lib/utils";
import { leadSchema } from "@/lib/validations";
import { Hono } from "hono";

const leadRouter = new Hono();

leadRouter.get("/", async (c) => {
    const data = await cFetch("http://localhost:3001/assets/leads.json");

    const parsed = leadSchema
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

leadRouter.post("/", async (c) => {
    const data = await cFetch("http://localhost:3001/assets/leads.json");

    const parsed = leadSchema
        .omit({
            createdAt: true,
            updatedAt: true,
        })
        .array()
        .parse(data);
    if (!parsed.length) c.throw("No leads found", "NOT_FOUND");

    const newLeads = await db.insert(leads).values(parsed).returning();

    return c.send({
        data: newLeads,
    });
});

// eslint-disable-next-line drizzle/enforce-delete-with-where
leadRouter.delete("/", async (c) => {
    // eslint-disable-next-line drizzle/enforce-delete-with-where
    await db.delete(leads);

    return c.send();
});

export default leadRouter;
