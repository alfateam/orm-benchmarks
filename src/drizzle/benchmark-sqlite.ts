import { exit } from 'node:process';
import db from './sqlite'

const ITERATIONS = Number.parseInt(process.env.ITERATIONS);
const ROUNDS = Number.parseInt(process.env.ROUNDS);
const POOLSIZE = Number.parseInt(process.env.POOLSIZE);

benchmark();

async function benchmark() {
	await warmup();
	console.time(`drizzle:pool ${POOLSIZE}:sqlite`);
	for (let i = 0; i < ROUNDS; i++) {
		await getRowsWithRelations();		
	}
	console.timeEnd(`drizzle:pool ${POOLSIZE}:sqlite`)
	exit(0);
}

async function warmup() {
	//to initate possible lazy loaded pool
	const promises = [];
	for (let i = 0; i < ITERATIONS; i++) {
        promises.push(db.query.customers.findFirst());
    }
	await Promise.all(promises);
}

async function getRowsWithRelations() {
	const promises = [];
	for (let i = 0; i < ITERATIONS; i++) {
		const p = db.query.orders.findMany({
			with: {
				details: {
					with: {
						product: {
							with: {
								supplier: {

								}
							}
						}
					}
				},
				customer: {},	
				employee: {},
			}
		// }).then(x => console.dir(x, {depth: Infinity}));
		}).then(JSON.stringify);
		promises.push(p);
	}
	await Promise.all(promises);
}



