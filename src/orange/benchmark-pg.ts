import { exit } from 'node:process';
import pg from './postgres';
// import orange from 'orange-orm';
//for sql logging:
// orange.on('query', console.dir)

async function benchmark() {
    await initPool();
    console.time('orange');
    const promises = [];
    for (let i = 0; i < 30; i++) {
        promises.push(getOrdersWithDetails());
    }
    await Promise.all(promises);
    console.timeEnd('orange')
    exit(0);
}

async function initPool() {
    //to initate possible lazy loaded pool
    await pg.orders.getOne();  
}

async function getOrdersWithDetails() {
    await pg.customers.getAll({
        orders: {
            details: true,
        }
    });
}


benchmark();

