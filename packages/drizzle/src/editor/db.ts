import { drizzle as postgresDrizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

import * as schema from "@workspace/drizzle/editor/schema";

declare global {
    var drizzle: ReturnType<typeof dbInit> | undefined;
}

const isProd = process.env.NODE_ENV === 'production';

const dbLogging = !isProd && (`${process.env.LOGGER}` !== 'false');

export function dbInit() {
    const client = postgres(process.env.POSTGRES_DB_URL!);
    const db = postgresDrizzle(client, { 
        schema, 
        logger: dbLogging, 
    });
    return db;
}

const db = globalThis.drizzle || dbInit();

if (process.env.NODE_ENV !== 'production') globalThis.drizzle = db;

export default db;
