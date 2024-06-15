import { exit } from 'node:process';
import postgres from './postgres';

async function benchmark() {
	await initPool();
	console.time('drizzle');
	const promises = [];
	for (let i = 0; i < 1; i++) {
		promises.push(getOrdersWithDetails());
	}
	await Promise.all(promises);
	console.timeEnd('drizzle');
	exit(0);
}

async function initPool() {
	//to initate possible lazy loaded pool
	await postgres.query.customers.findFirst();
}

async function getOrdersWithDetails() {
	const rows = await postgres.query.orders.findMany({
		with: {
			details: {

			},			
			// customer: {

			// }
		}
		,
		limit: 100
	});
	// const rows = await postgres.query.customers.findMany({
	// 	with: {
	// 		orders: {
	// 			with: {
	// 				details: {

	// 				}
	// 			}
	// 		}
	// 	}
	// });
	JSON.stringify(rows);

}

benchmark();