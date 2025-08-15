import db from '@workspace/editor-db/db';
import { users } from '@workspace/editor-db/schema';
import { and, eq, sql } from 'drizzle-orm';

export type GetUserParams = {
    filter: ['email' | 'userId', string];
    throwErrors?: boolean;
};

export type GetUserResponse = {
    data: null | Omit<typeof users.$inferSelect, 'password'>;
    errors?: {
        message: string;
        field?: string;
        cause?: any;
    }[];
};

export async function getUser({ filter, throwErrors, }: GetUserParams): Promise<GetUserResponse> {
    try {
        const email = filter[0] === 'email' ? filter[1] : undefined;
        const userId = filter[0] === 'userId' ? filter[1] : undefined;

        const where = [
            email ? eq(sql`lower(${users.email})`, email.toLowerCase()) : undefined,
            userId ? eq(users.userId, userId) : undefined,
        ].filter(sql => sql);

        if (!where.length) throw new Error('Invalid `filter` param.');

        const user = await db.query.users.findFirst({
            where: and(...where),
        });

        return {
            data: user || null,
        };
    } catch(e: any) {
        if (throwErrors) throw e;

        return {
            data: null,
            errors: [{
                message: e.message,
                cause: e.cause,
            }],
        };
    }
}
