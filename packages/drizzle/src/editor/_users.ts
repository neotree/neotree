import { sql } from "drizzle-orm";
import { 
    index,
    pgTable, 
    serial, 
    text, 
    timestamp, 
    uuid,
} from "drizzle-orm/pg-core";

import { roleNameEnum } from '@workspace/drizzle/editor/utils';
import { userRoles } from '@workspace/drizzle/editor/_user-roles';

// USERS
export const users = pgTable(
    'nt_users', 
    {
        id: serial('id').primaryKey(),
        userId: uuid('user_id').notNull().unique().defaultRandom(),
        role: roleNameEnum('role').references(() => userRoles.name, { onDelete: 'cascade', }).default('user').notNull(),
        email: text('email').notNull().unique(),
        password: text('password').notNull(),
        displayName: text('display_name').notNull(),
        firstName: text('first_name'),
        lastName: text('last_name'),     

        avatar: text('avatar'),
        avatar_sm: text('avatar_sm'),
        avatar_md: text('avatar_md'),

        activationDate: timestamp('activation_date'),
        lastLoginDate: timestamp('last_login_date'),
        
        createdAt: timestamp('created_at').defaultNow().notNull(),
        updatedAt: timestamp('updated_at').defaultNow().notNull().$onUpdate(() => new Date()),
        deletedAt: timestamp('deleted_at'),
    },
    table => ({
        searchIndex: index('users_search_index')
            .using(
                'gin', 
                sql`(
                    to_tsvector('english', ${table.email}) ||
                    to_tsvector('english', ${table.displayName}) ||
                    to_tsvector('english', ${table.firstName}) ||
                    to_tsvector('english', ${table.lastName})
                )`
            ),
    }),
);
