import { exit } from 'node:process';
import db from './mysql'
import { WARMUP_ORDER_IDS, assertWarmupOrders, normalizeOrderLike } from '../bench/warmup-check';

const ITERATIONS = Number.parseInt(process.env.ITERATIONS);
const ROUNDS = Number.parseInt(process.env.ROUNDS);
const POOLSIZE = Number.parseInt(process.env.POOLSIZE);

benchmark();

async function benchmark() {
	await warmup();
	console.time(`drizzle:pool ${POOLSIZE}:mysql`);
	for (let i = 0; i < ROUNDS; i++) {
		await getRowsWithRelations();		
	}
	console.timeEnd(`drizzle:pool ${POOLSIZE}:mysql`)
	exit(0);
}

async function warmup() {
	const orders = await db.query.orders.findMany({
		where: (orders, { inArray }) => inArray(orders.id, WARMUP_ORDER_IDS),
		with: {
			details: {
				with: {
					product: {
						with: {
							supplier: {},
						},
					},
				},
			},
			customer: {},
			employee: {},
		},
	});
	await assertWarmupOrders(orders.map(normalizeOrderLike), 'drizzle:mysql');
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



