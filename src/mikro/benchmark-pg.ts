import 'reflect-metadata';
import { exit } from 'node:process';
import { MikroORM } from '@mikro-orm/core';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import dotenv from 'dotenv';
import { WARMUP_ORDER_IDS, assertWarmupOrders, normalizeOrderLike } from '../bench/warmup-check';

import { CustomerSchema } from './schema';
import { EmployeeSchema } from './schema';
import { Order, OrderSchema } from './schema';
import { OrderDetailSchema } from './schema';
import { ProductSchema } from './schema';
import { SupplierSchema } from './schema';

dotenv.config();
const ITERATIONS = Number.parseInt(process.env.ITERATIONS);
const ROUNDS = Number.parseInt(process.env.ROUNDS);
const POOLSIZE = Number.parseInt(process.env.POOLSIZE)
const LOG = process.env.LOG === 'true';

async function main() {
  const orm = await MikroORM.init({
    entities: [CustomerSchema, EmployeeSchema, OrderSchema, OrderDetailSchema, ProductSchema, SupplierSchema],
    discovery: {
      warnWhenNoEntities: true,
      requireEntitiesArray: false,
      alwaysAnalyseProperties: true,
    },
    dbName: 'postgres',
    driver: PostgreSqlDriver,
    clientUrl: `${process.env.POSTGRES_URL}`,    
    pool: {
      min: POOLSIZE,
      max: POOLSIZE
    },
    debug: LOG,
  });

  await benchmark();

  async function benchmark() {
    await warmup();
    console.time(`mikro:pool ${POOLSIZE}:pg`);
    for (let i = 0; i < ROUNDS; i++) {
        await getRowsWithRelations();        
    }
    console.timeEnd(`mikro:pool ${POOLSIZE}:pg`)
    await orm.close(true);
	  exit(0);
  }
  
  async function warmup() {
    const orders = await orm.em.fork({ flushMode: 'commit' }).find(
      Order,
      { id: { $in: WARMUP_ORDER_IDS } },
      { populate: ['customer', 'employee', 'orderDetails.product.supplier'] }
    );
    await assertWarmupOrders(orders.map(normalizeOrderLike), 'mikro:pg');
  }
  
  async function getRowsWithRelations() {
    const em = orm.em;
    const promises = [];
    for (let i = 0; i < ITERATIONS; i++) {
      const p = em.fork({flushMode: 'commit'}).find(Order, {}, {        
        populate: ['customer', 'employee', 'orderDetails.product.supplier'],
        strategy: 'select-in',      
      }).then(JSON.stringify);
      promises.push(p);
    }
    await Promise.all(promises);
  }

}


main().catch(err => {
  console.error(err);
  process.exit(1);
});
