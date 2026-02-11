import { exit } from 'node:process';
import db from './mssql';
import orange from 'orange-orm';

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
    console.time(`orange:pool ${POOLSIZE}:mssql`);
    for (let i = 0; i < ROUNDS; i++) {
        await getRowsWithRelations();        
    }
    console.timeEnd(`orange:pool ${POOLSIZE}:mssql`)
	exit(0);
}

async function warmup() {    
    //to initate possible lazy loaded pool    
    const promises = [];
    for (let i = 0; i < ITERATIONS; i++) {        
        promises.push(db.customers.getOne());        
    }
    await Promise.all(promises);    
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