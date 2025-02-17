import { pgTable, uuid, varchar, timestamp } from 'drizzle-orm/pg-core';

export const sites = pgTable('sites', {
  id: uuid('id').primaryKey().defaultRandom(), 
  organization_id: uuid('organization_id').notNull().references(() => organizations.id), 
  name: varchar('name', { length: 255 }).notNull(),
  address_line_1: varchar('address_line_1', { length: 255 }).notNull(),
  address_line_2: varchar('address_line_2', { length: 255 }),
  city: varchar('city', { length: 255 }).notNull(),
  state: varchar('state', { length: 255 }).notNull(),
  zip_code: varchar('zip_code', { length: 20 }).notNull(), 
  contact_email: varchar('contact_email', { length: 255 }).notNull().unique(),
  contact_phone: varchar('contact_phone', { length: 20 }), 
  created_at: timestamp('created_at').defaultNow().notNull(),
});
