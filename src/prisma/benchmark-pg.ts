import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
dotenv.config();
const ITERATIONS = Number.parseInt(process.env.ITERATIONS);
const ROUNDS = Number.parseInt(process.env.ROUNDS);
const POOLSIZE = Number.parseInt(process.env.POOLSIZE);

const prisma = new PrismaClient({
    datasources: {
        db: {
            url: `${process.env.POSTGRES_URL}?connection_limit=${POOLSIZE}`,
        },
    },
    log: [
        // { emit: 'event', level: 'query' },        
    ],
});


// prisma.$on('query', (e) => {
//     console.log('Query: ' + e.query);
//     console.log('Params: ' + e.params);
//     console.log('Duration: ' + e.duration + 'ms');
//   });

benchmark();

async function benchmark() {
    await warmup();
    console.time(`prisma:pool ${POOLSIZE}`);
    for (let i = 0; i < ROUNDS; i++) {
        await getRowsWithRelations();        
    }
    console.timeEnd(`prisma:pool ${POOLSIZE}`);
    await prisma.$disconnect();
}

async function warmup() {
    const promises = [];
    for (let i = 0; i < ITERATIONS; i++) {
        promises.push(prisma.customer.findFirst());
    }
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