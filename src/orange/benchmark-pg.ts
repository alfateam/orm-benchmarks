import { exit } from 'node:process';
import pg from './postgres';
import orange from 'orange-orm';
// for sql logging:
// orange.on('query', console.dir)

async function benchmark() {
    await initPool();
    console.time('orange');
    const promises = [];
    for (let i = 0; i < 50; i++) {
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
    const rows = await pg.orders.getAll({
            details: true,
            // customer: true
            limit: 100
    });
    // const rows = await pg.customers.getAll({
    //     orders: {
    //         details: true,
    //     }
    // });
    
    JSON.stringify(rows);
    // console.dir(rows, { depth: Infinity})
}


benchmark();

