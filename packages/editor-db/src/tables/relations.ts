import { relations } from 'drizzle-orm';

import { users } from '@workspace/editor-db/tables/users';
import { userRoles } from '@workspace/editor-db/tables/user-roles';

export const rolesRelations = relations(userRoles, ({ many }) => ({
    users: many(users),
}));
