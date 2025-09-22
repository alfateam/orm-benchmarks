import { PrismaClient } from "./generated/mssql/client";
import { PrismaMssql } from "@prisma/adapter-mssql";


import dotenv from 'dotenv';
import extractParameters from '../extractMsParameters';
dotenv.config();
const ITERATIONS = Number.parseInt(process.env.ITERATIONS);
const ROUNDS = Number.parseInt(process.env.ROUNDS);
const POOLSIZE = Number.parseInt(process.env.POOLSIZE);
const LOG = process.env.LOG === 'true';

const params = extractParameters(process.env.MSSQL_URL);
const adapter = new PrismaMssql({ connectionString:  `sqlserver://${params.server}${params.port ? `:${params.port}` : ''};initial catalog=${params.database};user=${params.uid};password=${params.pwd};trustServerCertificate=true;encrypt=false;connectionLimit=${POOLSIZE};poolTimeout=200` });

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