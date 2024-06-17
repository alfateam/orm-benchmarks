import { exit } from 'node:process';
import postgres from './postgres';
const ITERATIONS = 50;

benchmark();

async function benchmark() {
	await warmup();
	await getRowsWithRelations();
	exit(0);
}

async function warmup() {
	//to initate possible lazy loaded pool
	await postgres.query.customers.findFirst();
}

async function getRowsWithRelations() {
	console.time('drizzle getRowsWithRelations');
	const promises = [];
	for (let i = 0; i < ITERATIONS; i++) {
		const p = postgres.query.orders.findMany({
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
				employee: {}											
			}
		}).then(JSON.stringify);
		promises.push(p);
	}
	await Promise.all(promises);
	console.timeEnd('drizzle getRowsWithRelations')
}



