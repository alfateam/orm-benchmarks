import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import * as schema from './schema-sqlite';
import dotenv from 'dotenv';

dotenv.config();

const DB_PATH = 'sqlite.db';
const LOG = process.env.LOG === 'true';

const db = new Database(DB_PATH, {
  verbose: LOG ? console.log : null,
});

export const database = drizzle(db, {
  schema,  
  logger: LOG,
});

export type database = typeof database;

export default database;
