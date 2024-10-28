import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { integer, pgTable, text, uuid, date, timestamp } from 'drizzle-orm/pg-core';
import { configDotenv } from 'dotenv';
configDotenv();

// Define Postgres pool connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Initialize Drizzle ORM
export const db = drizzle(pool);

// Define the products table
export const products = pgTable('products', {
  id: uuid('id').primaryKey(),
  name: text('name'),
  inventory_count: integer('inventory_count'),
  created_at: timestamp().notNull().defaultNow(),
  updated_at: timestamp()
});
