import { exit } from 'node:process';
import db from './mysql';
import orange from 'orange-orm';
import { WARMUP_ORDER_IDS, assertWarmupOrders, normalizeOrderLike } from '../bench/warmup-check';

const ITERATIONS = Number.parseInt(process.env.ITERATIONS);
const ROUNDS = Number.parseInt(process.env.ROUNDS);
const POOLSIZE = Number.parseInt(process.env.POOLSIZE)
const LOG = process.env.LOG === 'true';

// for sql logging:
if (LOG)
    orange.on('query', console.dir)

benchmark();

async function benchmark() {
	await warmup();
    console.time(`orange:pool ${POOLSIZE}:mysql`);
    for (let i = 0; i < ROUNDS; i++) {
        await getRowsWithRelations();        
    }
    console.timeEnd(`orange:pool ${POOLSIZE}:mysql`)
	exit(0);
}

async function warmup() {    
    const orders = await db.orders.getMany({
        where: x => x.id.in(WARMUP_ORDER_IDS),
        details: {
            product: {
                supplier: true
            }
        },
        customer: true,
        employee: true,
    });
    await assertWarmupOrders(orders.map(normalizeOrderLike), 'orange:mysql');
}

async function getRowsWithRelations() {
    const promises = [];
    for (let i = 0; i < ITERATIONS; i++) {        
        const p = db.orders.getMany({
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
}
