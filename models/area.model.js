import { pgTable, uuid, varchar, text, timestamp } from 'drizzle-orm/pg-core';
import { sites } from './site.model.js';

export const areas = pgTable('areas', {
  id: uuid('id').primaryKey().defaultRandom(), 
  site_id: uuid('site_id')
    .notNull()
    .references(() => sites.id),
  name: varchar('name', { length: 255 }).notNull(),
  description: text('description'), 
  created_at: timestamp('created_at').defaultNow().notNull(),
});
