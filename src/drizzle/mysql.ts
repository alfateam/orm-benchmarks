import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import * as schema from './schema-mysql';
import dotenv from 'dotenv';

dotenv.config();

const POOLSIZE = Number.parseInt(process.env.POOLSIZE, 10);
const LOG = process.env.LOG === 'true';

const pool = mysql.createPool({
  uri: process.env.MYSQL_URL,
  connectionLimit: POOLSIZE,
});

export const db = drizzle(pool, {
  schema,
  mode: 'default',
  logger: LOG,
});

export type db = typeof db;

export default db;
