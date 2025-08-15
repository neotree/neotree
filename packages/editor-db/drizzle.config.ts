import '@workspace/env';
import type { Config } from 'drizzle-kit';

export default {
    schema: './src/schema.ts',
    out: './src/migrations',
    dialect: 'postgresql',
    dbCredentials: {
        url: process.env.POSTGRES_DB_URL!,
    },
} satisfies Config;
