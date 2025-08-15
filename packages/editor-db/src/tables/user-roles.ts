import { pgTable, serial, text } from "drizzle-orm/pg-core";

import { roleNameEnum } from '@workspace/editor-db/utils';

// USER ROLES
export const userRoles = pgTable('nt_user_roles', {
    id: serial('id').primaryKey(),
    name: roleNameEnum('name').notNull().unique(),
    description: text('description'),
});
