import path from 'node:path';
import fs from 'node:fs';
const sql = fs.readFileSync(path.resolve("./data/init-mysql.sql"), "utf-8");
import db from './orange/mysql';
import { exit } from 'node:process';


async function init() {
    const statements = sql.split(';');
    for(let state of statements) {
        if (state.trimEnd())
		    await db.query(state);
	}
    await db.close();
    exit(0);
}

init();
