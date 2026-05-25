import { mysqlTable, serial, varchar, text, timestamp, json } from "drizzle-orm/mysql-core";

export const projects = mysqlTable("projects", {
  id: serial("id").primaryKey(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  name: varchar("name", { length: 255 }).notNull(),
  industry: varchar("industry", { length: 100 }).notNull(),
  industryId: varchar("industry_id", { length: 100 }).notNull(),
  status: varchar("status", { length: 20 }).notNull().default("draft"),
  inputUrl: varchar("input_url", { length: 500 }).notNull(),
  inputType: varchar("input_type", { length: 20 }).notNull(),
  businessName: varchar("business_name", { length: 255 }),
  tagline: varchar("tagline", { length: 500 }),
  description: text("description"),
  phone: varchar("phone", { length: 50 }),
  email: varchar("email", { length: 255 }),
  address: varchar("address", { length: 500 }),
  hours: varchar("hours", { length: 255 }),
  rating: varchar("rating", { length: 10 }),
  reviewCount: varchar("review_count", { length: 20 }),
  services: json("services").$type<string[]>(),
  primaryColor: varchar("primary_color", { length: 20 }),
  secondaryColor: varchar("secondary_color", { length: 20 }),
  accentColor: varchar("accent_color", { length: 20 }),
  fontFamily: varchar("font_family", { length: 50 }),
  sections: json("sections").$type<{ id: string; type: string; name: string; enabled: boolean; order: number }[]>(),
  rawText: text("raw_text"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type Project = typeof projects.$inferSelect;
export type InsertProject = typeof projects.$inferInsert;
