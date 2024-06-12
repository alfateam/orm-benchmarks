import path from 'node:path';
import fs from 'node:fs';
const sql = fs.readFileSync(path.resolve("./data/init-postgres.sql"), "utf-8");
import db from './orange/postgres';
import { exit } from 'node:process';


async function init() {
    await db.query(sql);
    exit(0);
}

init();
