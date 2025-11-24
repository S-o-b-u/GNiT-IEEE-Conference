import { defineConfig } from "drizzle-kit";
import * as dotenv from "dotenv";

// Load the environment variables
dotenv.config({ path: ".env.local" });

// DEBUG: Check if the URL is actually loading
console.log("DB URL IS:", process.env.DATABASE_URL);

const TEMP_DB_URL = "postgresql://neondb_owner:npg_4BUuZYw6pHmh@ep-late-resonance-agf9d9wg-pooler.c-2.eu-central-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"

export default defineConfig({
  schema: "./src/lib/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    // If this is undefined, the error occurs
    url: process.env.DATABASE_URL! || TEMP_DB_URL, 
  },
});