import '@workspace/env';
import type { Config } from 'drizzle-kit';

export default {
    schema: './schema.ts',
    out: './migrations',
    dialect: 'postgresql',
    dbCredentials: {
        url: process.env.POSTGRES_DB_URL!,
    },
} satisfies Config;
