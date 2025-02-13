import { pgTable, serial, varchar, timestamp } from "drizzle-orm/pg-core";

export const organization = pgTable("organization", {
  organizationId: serial("organization_id").primaryKey(),
  name: varchar("name").notNull().unique(),
  emailDomain: varchar("email_domain", { length: 255 }).notNull().unique(),
  industryType: varchar("industry_type", { length: 255 }).notNull().unique(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow(),
});
