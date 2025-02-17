import { pgTable, serial, varchar, timestamp } from 'drizzle-orm/pg-core';

export const organizations = pgTable('organizations', {
  organization_id: serial('organization_id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull().unique(),
  email_domain: varchar('email_domain', { length: 255 }).notNull().unique(),
  industry_type: varchar('industry_type', { length: 255 }).notNull().unique(),
  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at').defaultNow().$onUpdate(() => new Date())
});