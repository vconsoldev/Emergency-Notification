import { pgTable, uuid, varchar, timestamp } from 'drizzle-orm/pg-core';

export const roles = pgTable('roles', {
  id: uuid('id').primaryKey().defaultRandom(), // UUID as Primary Key
  role_name: varchar('role_name', { length: 50 }).notNull().unique(),
  description: varchar('description', { length: 255 }), // Nullable description
  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at').defaultNow().notNull().$onUpdate(() => new Date()),
});
