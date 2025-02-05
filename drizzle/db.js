import { drizzle } from 'drizzle-orm/node-postgres';
import pkg from 'pg';
import dotenv from 'dotenv';

dotenv.config();
const { Client } = pkg;

let dbInstance;  

export async function connectDB() {
  if (!dbInstance) {
    const client = new Client({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: process.env.DB_PORT,
    });

    await client.connect();
    console.log('Connected to PostgreSQL with Drizzle ORM');

    dbInstance = drizzle(client);  
  }
  
  return dbInstance;
}
