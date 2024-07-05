import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from "postgres";
import * as schema from './schema';


export const connection = postgres('postgres://postgres:postgres@postgres/postgres', { max: 3 });

export const db = drizzle(connection, {
  schema,
  logger: false,
});

export type db = typeof db;

export default db;
