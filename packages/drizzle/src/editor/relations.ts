import { relations } from 'drizzle-orm';

import { users } from '@workspace/drizzle/editor/_users';
import { userRoles } from '@workspace/drizzle/editor/_user-roles';

export const rolesRelations = relations(userRoles, ({ many }) => ({
    users: many(users),
}));
