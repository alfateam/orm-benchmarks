import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
dotenv.config();
const ITERATIONS = Number.parseInt(process.env.ITERATIONS);
const ROUNDS = Number.parseInt(process.env.ROUNDS);
const POOLSIZE = Number.parseInt(process.env.POOLSIZE);
const LOG = process.env.LOG === 'true';

const prisma = new PrismaClient({
    datasources: {
        db: {
            url: `file:../../${process.env.SQLITE_URL}?connection_limit=${POOLSIZE}`,
        },
    },
    log: LOG ? [{ emit: 'event', level: 'query' }] : undefined
});


prisma.$on('query', (e) => {
    console.log('Query: ' + e.query);
    console.log('Params: ' + e.params);
    console.log('Duration: ' + e.duration + 'ms');
  });

benchmark();

async function benchmark() {
    await warmup();
    console.time(`prisma:pool ${POOLSIZE}:sqlite`);
    for (let i = 0; i < ROUNDS; i++) {
        await getRowsWithRelations();        
    }
    console.timeEnd(`prisma:pool ${POOLSIZE}:sqlite`);
    await prisma.$disconnect();
}

async function warmup() {
    const promises = [];
    for (let i = 0; i < ITERATIONS; i++) {
        promises.push(prisma.customer.findFirst());
    }
    await Promise.all(promises);
}

async function getRowsWithRelations() {
    const promises = [];
    for (let i = 0; i < ITERATIONS; i++) {
        const p = prisma.order.findMany({
            include: {
                customer: true,
                employee: true,
                orderDetails: {
                    include: {
                        product: {
                            include: {
                                supplier: true
                            }
                        },
                    },
                },
            }
        }).then(JSON.stringify);
        promises.push(p);
    }
    await Promise.all(promises);

}