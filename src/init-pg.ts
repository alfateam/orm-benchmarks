import path from 'node:path';
import fs from 'node:fs';
const sql = fs.readFileSync(path.resolve("./data/init-postgres.sql"), "utf-8");
import db from './orange/pg';
import { exit } from 'node:process';


async function init() {
    await db.query(sql);
    await db.close();
    exit(0);
}

init();
