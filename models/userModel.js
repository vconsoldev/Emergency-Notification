import { pgTable, serial, varchar, text, boolean, uuid, integer, timestamp } from 'drizzle-orm/pg-core';
import bcrypt from 'bcryptjs';

export const users = pgTable('users', {
  user_id: serial('user_id').primaryKey(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  password: text('password').notNull(),
  first_name: varchar('first_name', { length: 100 }).notNull(),
  last_name: varchar('last_name', { length: 100 }).notNull(),
  phone_number: varchar('phone_number', { length: 20 }).notNull(),
  is_active: boolean('is_active').notNull().default(true),
//   role_id: uuid('role_id').references(() => Roles.id),  // Ensure Roles table exists
//   organization_id: integer('organization_id').references(() => organizations.organization_id),  // Ensure organizations table exists
  created_at: timestamp('created_at').defaultNow(),
  updated_at: timestamp('updated_at').defaultNow().$onUpdate(() => new Date())
});

export const hashPassword = async (password) => {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
};