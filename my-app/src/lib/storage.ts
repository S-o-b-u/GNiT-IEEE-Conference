import { db } from "./db" 
import {
    generalSettings, speakers, importantDates, committee, 
    registrationFees, contacts, pages, 

    InsertGeneralSetting, NewSpeaker, InsertImportantDate, 
    NewCommitteeMember, NewPageContent
} from "./db/schema"; 
import { eq, desc, asc } from "drizzle-orm"; 

export const storage = {
    // general settings controllers
    async getSettings() {
        const res = await db.select().from(generalSettings).limit(1); 
        return res[0] || null; 
    }, 

    async updateSettings(data: Partial<InsertGeneralSetting>) {
        return await db.insert(generalSettings)
                        .values({ id: 1,  ...data } as InsertGeneralSetting)
                        .onConflictDoUpdate({
                            target: generalSettings.id, 
                            set: data,
                        })
                        .returning(); 
    },

    // speakers controllers
    async getSpeakers() {
        return await db.select()
                        .from(speakers)
                        .orderBy(asc(speakers.displayOrder), desc(speakers.createdAt)); 
    }, 

    async createSpeaker(speaker: NewSpeaker) {
        return await db.insert(speakers).values(speaker).returning(); 
    }, 

    async updateSpeaker(id: number, data: Partial<NewSpeaker>) {
        return await db.update(speakers) 
                        .set(data)
                        .where(eq(speakers.id, id))
                        .returning();
    }, 

    async deleteSpeaker(id: number) {
        return await db.delete(speakers).where(eq(speakers.id, id)); 
    },


    // dates controllers
    async getDates() {
        return await db.select().from(importantDates).orderBy(asc(importantDates.id)); 
    },
    
    async createDate(date: InsertImportantDate) {
        return await db.insert(importantDates).values(date).returning(); 
    }, 

    async deleteDate(id: number) {
        return await db.delete(importantDates).where(eq(importantDates.id, id)); 
    }, 

    // committee
    async getCommittee(role?: "Advisory" | "Organizing" | "TPC") {
        if(role) {
            return await db.select()
                            .from(committee)
                            .where(eq(committee.role, role))
                            .orderBy(asc(committee.displayOrder)); 
        }
        return await db.select().from(committee).orderBy(asc(committee.displayOrder)); 
    }, 

    async createCommitteeMember(member: NewCommitteeMember) {
        return await db.insert(committee).values(member).returning(); 
    },

    async deleteCommitteeMember(id: number) {
        return await db.delete(committee).where(eq(committee.id, id));
    }, 


    // Registration fees 
    async getFees() {
        return await db.select().from(registrationFees).orderBy(asc(registrationFees.id));
    },

    async updateFee(id: number, indianFee: string, internationalFee: string) {
        return await db.update(registrationFees)
                        .set({ indianFee, internationalFee })
                        .where(eq(registrationFees.id, id))
    }, 

    // contacts
    async getContacts() {
        return await db.select().from(contacts);
    },

    async createContact(contact: typeof contacts.$inferInsert) {
        return await db.insert(contacts).values(contact).returning();
    },

    async deleteContact(id: number) {
        return await db.delete(contacts).where(eq(contacts.id, id));
    },

    // CMS pages 
    async getPage(slug: string) {
        const res = await db.select().from(pages).where(eq(pages.slug, slug));
        return res[0] || null; 
    }, 

    async updatePage(slug: string, content: Partial<NewPageContent>) {
        return await db.insert(pages)
                    .values({ slug, title: content.title || "Untitled", content: content.content || "" })
                    .onConflictDoUpdate({
                        target: pages.slug, 
                        set: content
                    })
                    .returning(); 
    }
}