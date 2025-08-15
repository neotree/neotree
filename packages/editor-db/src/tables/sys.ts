import { pgTable, serial, text, uuid, } from "drizzle-orm/pg-core";

// SYS
export const sys = pgTable('nt_sys', {
    _id: serial('_id').primaryKey(),
    id: uuid('id').notNull().unique().defaultRandom(),
    key: text('key').notNull().unique(),
    value: text('value').notNull(),
});
