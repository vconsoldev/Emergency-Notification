import { defineConfig } from "drizzle-kit";

export default defineConfig({
    schema: "./path/to/your/schema.ts",
    out: "./path/to/migrations",
    dialect: "postgresql", // or your specific database dialect
    dbCredentials: {
        url: process.env.DATABASE_URL, // Ensure this environment variable is set
    },
});
