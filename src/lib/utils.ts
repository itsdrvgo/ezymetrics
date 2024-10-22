import { init } from "@paralleldrive/cuid2";
import { DrizzleError } from "drizzle-orm";
import { ZodError } from "zod";
import type { ResponseMessages } from "./validations";

export function wait(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export function sanitizeError(err: unknown) {
    if (err instanceof HonoError) return err.message;
    else if (err instanceof ZodError)
        return err.issues.map((x) => x.message).join(", ");
    else if (err instanceof DrizzleError) return err.message;
    else if (err instanceof Error) return err.message;
    else return "Unknown error";
}

export class HonoError extends Error {
    status: ResponseMessages;

    constructor(message: string, status: ResponseMessages) {
        super(message);
        this.status = status;
    }
}

export function slugify(str: string, separator: string = "-") {
    return str
        .toString()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9 ]/g, "")
        .replace(/\s+/g, separator);
}

export function convertKeyToLabel(key: string) {
    return key
        .replace(/([A-Z])/g, " $1")
        .replace(/^./, (str) => str.toUpperCase())
        .replace(/And/g, "&")
        .trim();
}

export function generateId(
    options: {
        random?: () => number;
        counter?: () => number;
        length?: number;
        fingerprint?: string;
    } = {
        length: 24,
    }
) {
    return init(options)();
}

export async function cFetch<T>(
    url: string,
    options?: RequestInit
): Promise<T> {
    if (url.startsWith("/")) url = `${process.env.BACKEND_URL}${url}`;
    const res = await fetch(url, options);
    const data = await res.json();
    return data as T;
}

export const generateTableName = (prefix?: string) => (name: string) => {
    return prefix ? `${prefix}__${slugify(name)}` : slugify(name);
};

export function convertValueToLabel(value: string) {
    return value
        .replace(/([A-Z])/g, " $1")
        .replace(/^./, (str) => str.toUpperCase())
        .replace(/And/g, "&")
        .trim();
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function convertObjectKeysToLabels<T extends Record<string, any>>(
    obj: T
) {
    return Object.fromEntries(
        Object.entries(obj).map(([key, value]) => [
            convertKeyToLabel(key),
            value,
        ])
    ) as T;
}
