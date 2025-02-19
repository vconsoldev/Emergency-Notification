import { connectDB } from './drizzle/db.js'
import { migrate } from "drizzle-orm/node-postgres/migrator";
import * as models from './models/index.js'; 

async function runMigrations() {
  try {
    const db = await connectDB(); 
    await migrate(db, { migrationsFolder: "./migrations" }); 
    console.log("All tables created successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Migration failed:", error);
    process.exit(1);
  }
}

runMigrations();
