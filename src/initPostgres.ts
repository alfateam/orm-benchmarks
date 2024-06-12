import path from 'node:path';
import fs from 'node:fs';
const sql = fs.readFileSync(path.resolve("./data/init-postgres.sql"), "utf-8");
import db from './orange/postgres';


async function init() {
    await db.query(sql);
}

export default init;
