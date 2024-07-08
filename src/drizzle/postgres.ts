import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from "postgres";
import * as schema from './schema';
import dotenv from 'dotenv';
dotenv.config();

export const connection = postgres(process.env.POSTGRES_URL, { max: 10 });

export const db = drizzle(connection, {
  schema,
  logger: false,
});

export type db = typeof db;

export default db;
