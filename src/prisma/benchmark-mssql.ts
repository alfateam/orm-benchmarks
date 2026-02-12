import { PrismaClient } from "./generated/mssql/client";
import { PrismaMssql } from "@prisma/adapter-mssql";
import { WARMUP_ORDER_IDS, assertWarmupOrders, normalizeOrderLike } from '../bench/warmup-check';


import dotenv from 'dotenv';
import extractParameters from '../extractMsParameters';
dotenv.config();
const ITERATIONS = Number.parseInt(process.env.ITERATIONS);
const ROUNDS = Number.parseInt(process.env.ROUNDS);
const POOLSIZE = Number.parseInt(process.env.POOLSIZE);
const LOG = process.env.LOG === 'true';

const params = extractParameters(process.env.MSSQL_URL);
const adapterConfig = {
    server: params.server,
    port: params.port ? Number.parseInt(params.port, 10) : undefined,
    database: params.database,
    user: params.uid,
    password: params.pwd,
    options: {
        trustServerCertificate: true,
        encrypt: false,
    },
    pool: {
        max: POOLSIZE,
        acquireTimeoutMillis: 200_000,
    },
};
const adapter = new PrismaMssql(adapterConfig);

const prisma = new PrismaClient({
    adapter,
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
    console.time(`prisma:pool ${POOLSIZE}:mssql`);
    for (let i = 0; i < ROUNDS; i++) {
        await getRowsWithRelations();        
    }
    console.timeEnd(`prisma:pool ${POOLSIZE}:mssql`);
    await prisma.$disconnect();
}

async function warmup() {
    const orders = await prisma.order.findMany({
        where: { id: { in: WARMUP_ORDER_IDS } },
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
        },
    });
    await assertWarmupOrders(orders.map(normalizeOrderLike), 'prisma:mssql');
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
