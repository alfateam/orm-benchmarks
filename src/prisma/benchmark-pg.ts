import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
dotenv.config();
const ITERATIONS = Number.parseInt(process.env.ITERATIONS);

const prisma = new PrismaClient({
    datasources: {
        db: {
            url: `${process.env.POSTGRES_URL}?connection_limit=10`,
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
    await getRowsWithRelations();
    await prisma.$disconnect();
}

async function warmup() {
    for (let i = 0; i < 12; i++) {        
        await prisma.order.findMany({ take: 1 });        
    }
}

async function getRowsWithRelations() {
    console.time('prisma');
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
    console.timeEnd('prisma');

}