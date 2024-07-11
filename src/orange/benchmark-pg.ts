import { exit } from 'node:process';
import pg from './postgres';

const ITERATIONS = Number.parseInt(process.env.ITERATIONS);
const ROUNDS = Number.parseInt(process.env.ROUNDS);
const POOLSIZE = Number.parseInt(process.env.POOLSIZE)

// for sql logging:
// import orange from 'orange-orm';
// orange.on('query', console.dir)

benchmark();

async function benchmark() {
	await warmup();
    console.time(`orange:pool ${POOLSIZE}`);
    for (let i = 0; i < ROUNDS; i++) {
        await getRowsWithRelations();        
    }
    console.timeEnd(`orange:pool ${POOLSIZE}`)
	exit(0);
}

async function warmup() {    
    //to initate possible lazy loaded pool    
    const promises = [];
    for (let i = 0; i < ITERATIONS; i++) {        
        promises.push(pg.customers.getOne());        
    }
    await Promise.all(promises);    
}

async function getRowsWithRelations() {
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
}