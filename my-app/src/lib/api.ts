import {
    // speakers
    Speaker, NewSpeaker,

    // dates 
    ImportantDate, InsertImportantDate,

    // pages
    PageContent,

    // settings
    GeneralSetting, InsertGeneralSetting,

    // committee
    CommitteeMember, NewCommitteeMember,

    // Fees 
    RegistrationFees,

    // contacts
    Contact, NewContact,

    speakers,
    generalSettings
} from "@/lib/db/schema"
import { string } from "zod";

const API_BASE = "/api";

// read Admin password from localstorage 
const getAuthHeader = () => {
    if (typeof window !== "undefined") {
        return { "x-admin-key": localStorage.getItem("adminKey") || "" };
    }
    return []
}

// JSON fetching 
const fetchJson = async <T>(url: string, options?: RequestInit): Promise<T> => {
    const res = await fetch(`${API_BASE}${url}`, options);
    if (!res.ok) {
        const error = await res.json().catch(() => ({}));
        throw new Error(error.error || `Request failed: ${res.status}`);
    }
    return res.json();
};

export const api = {

    // general settings
    settings: {
        get: () => fetchJson<GeneralSetting>("/settings"),

        update: (data: Partial<InsertGeneralSetting>) =>
            fetchJson<GeneralSetting>("/settings", {
                method: "PATCH",
                headers: { ...getAuthHeader(), "Content-Type": "application/json" },
                body: JSON.stringify(data),
            }),
    },

    // speakers
    speakers: {
        getAll: async (): Promise<Speaker[]> => {
            const res = await fetch(`${API_BASE}/speakers`);
            if (!res.ok) throw new Error("Failed to fetch speakers");
            return res.json();
        },

        add: async (data: NewSpeaker): Promise<Speaker> => {
            const res = await fetch(`${API_BASE}/speakers`, {
                method: "POST",
                headers: { ...getAuthHeader(), "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });
            if (!res.ok) throw new Error("Failed to add speaker");
            return res.json();
        },

        update: async (id: number, data: Partial<NewSpeaker>): Promise<Speaker> => {
            const res = await fetch(`${API_BASE}/speakers`, {
                method: "PATCH",
                headers: { ...getAuthHeader(), "Content-Type": "application/json" },
                body: JSON.stringify({ id, ...data }),
            });
            if (!res.ok) throw new Error("Failed to update Speaker");
            return res.json();
        },

        delete: async (id: number): Promise<void> => {
            const res = await fetch(`${API_BASE}/speakers?id=${id}`, {
                method: "DELETE",
                headers: getAuthHeader(),
            });
            if (!res.ok) throw new Error("Failed to delete speaker");
        },
    },

    // dates
    dates: {
        getAll: async (): Promise<ImportantDate[]> => {
            const res = await fetch(`${API_BASE}/dates`);
            return res.json();
        },

        add: async (data: InsertImportantDate) => {
            const res = await fetch(`${API_BASE}/dates`, {
                method: "POST",
                headers: { ...getAuthHeader(), "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });
            return res.json();
        },

        delete: async (id: number) => {
            await fetch(`${API_BASE}/dates?id=${id}`, {
                method: "DELETE",
                headers: getAuthHeader(),
            });
        }
    },

    // committee members
    committee: {
        getAll: (role?: string) =>
            fetchJson<CommitteeMember[]>(`/committee${role ? `?role=${role}` : ""}`),

        add: (data: NewCommitteeMember) =>
            fetchJson<CommitteeMember>("/committee", {
                method: "POST",
                headers: { ...getAuthHeader(), "Content-Type": "application/json" },
                body: JSON.stringify(data),
            }),

        delete: (id: number) => {
            fetchJson<void>(`/committee?id=${id}`, {
                method: "DELETE",
                headers: getAuthHeader(),
            })
        },
    },

    // fees
    fees: {
        getAll: () => fetchJson<RegistrationFees[]>("/fees"),

        update: (id: number, indianFee: string, internationalFee: string) =>
            fetchJson<RegistrationFees>("/fees", {
                method: "POST",
                headers: { ...getAuthHeader(), "Content-Type": "application/json" },
                body: JSON.stringify({ id, indianFee, internationalFee }),
            }),
    },

    // contacts
    contacts: {
        getAll: () => fetchJson<Contact[]>("/contacts"),

        add: (data: NewContact) =>
            fetchJson<Contact>("/contacts", {
                method: "POST",
                headers: { ...getAuthHeader(), "Content-Type": "application/json" },
                body: JSON.stringify(data),
            }),

        delete: (id: number) =>
            fetchJson<void>(`/contacts?id=${id}`, {
                method: "DELETE",
                headers: getAuthHeader(),
            }),
    },

    // pages
    pages: {
        get: (slug: string) => fetchJson<PageContent>(`/pages/${slug}`),

        update: (slug: string, content: string, title: string) =>
            fetchJson<PageContent>(`/pages/${slug}`, {
                method: "PATCH",
                headers: { ...getAuthHeader(), "Content-Type": "application/json" },
                body: JSON.stringify({ content, title }),
            }),
    }
}