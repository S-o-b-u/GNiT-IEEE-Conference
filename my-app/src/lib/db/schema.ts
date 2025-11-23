import { pgTable, serial, text, boolean, timestamp, pgEnum } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod" 

const timestamps = {
    createdAt: timestamp("created_at").defaultNow().notNull(), 
    updatedAt: timestamp("updated_at").defaultNow().$onUpdate(() => new Date()), 
}

// Enums
export const modeEnum = pgEnum("event_mode", ["Hybrid", "Offline", "Online"]); 
export const committeeRoleEnum = pgEnum("committee_role", ["Advisory", "Organizing", "TPC"]); 

export const generalSettings = pgTable("general_settings", {
    id: serial("id").primaryKey(), 
    eventTitle: text("event_title").notNull().default("International Conference 2026"), 
    eventSubtitle: text("event_subtitle"), 
    eventDates: text("event_dates").notNull(), 
    eventLocation: text("event_location").notNull(), 
    eventMode: modeEnum("event_mode").default("Hybrid"), 
    publicationInfo: text("publication_info"), 
    organizationDept: text("organizing_dept").default("Dept. of CSE"), 
    ...timestamps,
})

export const importantDates = pgTable("important_dates", {
    id: serial("id").primaryKey(), 
    title: text("title").notNull(), // eg: Paper Submission
    dateText: text("date_text").notNull(), // eg: "12th December, 2026"
    description: text("description"), 
    isHighlight: boolean("is_highlight").default(false), 
    ...timestamps
})

export const speakers = pgTable("speakers", {
    id: serial("id").primaryKey(), 
    name: text("name").notNull(),
    designation: text("designation").notNull(), // eg: Assistant Professor
    affiliation: text("affiliation").notNull(), // eg: IIT Kgp 
    title: text("title").default("Keynote Speaker"), 
    imageUrl: text("image_url").notNull(), 
    bio: text("bio"), 
    linkedinUrl: text("linkedin_url"), 
    displayOrder: serial("display_order"), // sorting control
    ...timestamps,
})

export const committee = pgTable("committee", {
    id: serial("id").primaryKey(), 
    name: text("name").notNull(), 
    affiliation: text("affiliation").notNull(),
    designation: text("designation"), 
    role: committeeRoleEnum("role").notNull(), 
    displayOrder: serial("display_order"), 
    ...timestamps, 
})

export const registrationFees = pgTable("registration_fees", {
    id: serial("id").primaryKey(), 
    category: text("category").notNull(), // "Academic", "Student" 
    indianFee: text("indian_fee").notNull(), 
    internationalFee: text("internationial_fee").notNull(), 
    ...timestamps, 
})

export const contacts = pgTable("contacts", {
    id: serial("id").primaryKey(), 
    name: text("name").notNull(), 
    designation: text("designation").notNull(), 
    email: text("email").notNull(), 
    phone: text("phone").notNull(), 
    ...timestamps,
})

// CMS 
export const pages = pgTable("pages", {
    slug: text("slug").primaryKey(), 
    title: text("title").notNull(), 
    content: text("content").notNull(), 
    lastUpdatedBy: text("last_updated_by"), 
    ...timestamps, 
})

export type GeneralSetting = typeof generalSettings.$inferSelect; 
export type InsertGeneralSetting = typeof generalSettings.$inferInsert; 

export type Speaker = typeof speakers.$inferSelect; 
export type NewSpeaker = typeof speakers.$inferInsert; 

export type CommitteeMember = typeof committee.$inferSelect; 
export type NewCommitteeMember = typeof committee.$inferInsert; 

export type PageContent = typeof pages.$inferSelect; 
export type NewPageContent = typeof pages.$inferInsert; 

/**
 * 
$inferSelect (The "Read" Type)
This represents the data coming OUT of the database.

Includes everything: It includes the id, createdAt, updatedAt, and every column exactly as stored.

Usage: You use this when you fetch data to display on the Frontend.

$inferInsert (The "Write" Type)
This represents the data going INTO the database.

Handles Defaults: It knows that columns with .default() or serial (like id) are optional. You don't need to provide an id when creating a speaker because the database generates it.

Usage: You use this in your API POST routes and Forms.

*/