import { exit } from 'node:process';
import pg from './postgres.js';
import dotenv from 'dotenv';
dotenv.config();;
const ITERATIONS = Number.parseInt(process.env.ITERATIONS);
// for sql logging:
// import orange from 'orange-orm';
// orange.on('query', console.dir)

benchmark();

async function benchmark() {
	await warmup();
	await getRowsWithRelations();
	exit(0);
}

async function warmup() {
    //to initate possible lazy loaded pool
    await pg.customers.getOne();
}

async function getRowsWithRelations() {
    console.time('orange');
    const promises = [];
    for (let i = 0; i < ITERATIONS; i++) {
        const p = pg.orders.getAll({
            details: {
                product: {
                    supplier: true
                }        
            },
            customer: true,
            employee: true,
        }).then(JSON.stringify);
        promises.push(p);
    }
    await Promise.all(promises);
    console.timeEnd('orange')
}