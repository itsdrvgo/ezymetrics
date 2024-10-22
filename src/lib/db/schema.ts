import {
    integer,
    numeric,
    pgTable,
    text,
    timestamp,
} from "drizzle-orm/pg-core";
import { generateId, generateTableName } from "../utils";

const generateTable = generateTableName("ezymetrics");

// Tables
export const leads = pgTable(generateTable("leads"), {
    id: text().notNull().primaryKey().$defaultFn(generateId),
    name: text().notNull(),
    email: text().notNull(),
    status: text().notNull(),
    createdAt: timestamp().notNull().defaultNow(),
    updatedAt: timestamp().notNull().defaultNow(),
});

export const campaigns = pgTable(generateTable("campaigns"), {
    id: text().notNull().primaryKey().$defaultFn(generateId),
    name: text().notNull(),
    budget: text().notNull(),
    leadsAcquired: integer().notNull(),
    startDate: timestamp().notNull(),
    endDate: timestamp().notNull(),
    createdAt: timestamp().notNull().defaultNow(),
    updatedAt: timestamp().notNull().defaultNow(),
});

export const metrics = pgTable(generateTable("metrics"), {
    id: text().notNull().primaryKey().$defaultFn(generateId),
    totalLeads: integer().notNull(),
    convertedLeads: integer().notNull(),
    conversionRate: numeric({
        precision: 5,
        scale: 2,
    }).notNull(),
    totalCampaignBudget: integer().notNull(),
    avgLeadsPerCampaign: numeric({
        precision: 5,
        scale: 2,
    }).notNull(),
    createdAt: timestamp().notNull().defaultNow(),
    updatedAt: timestamp().notNull().defaultNow(),
});
