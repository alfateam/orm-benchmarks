import { MikroORM } from '@mikro-orm/core';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import dotenv from 'dotenv';
import { Customer } from './schema';
import { Employee } from './schema';
import { Order } from './schema';
import { OrderDetail } from './schema';
import { Product } from './schema';
import { Supplier } from './schema';

dotenv.config();
const ITERATIONS = Number.parseInt(process.env.ITERATIONS);

async function main() {
  const orm = await MikroORM.init({
    entities: [Customer, Employee, Order, OrderDetail, Product, Supplier],
    dbName: 'your_db_name',
    driver: PostgreSqlDriver,
    clientUrl: `${process.env.POSTGRES_URL}`,
    pool: {
      min: 1,
      max: 1
    },
    debug: false,
  });

  await benchmark();

  async function benchmark() {
    await warmup();
    await getRowsWithRelations();
  }
  
  async function warmup() {
    const em = orm.em.fork();
    await em.find(Order, {}, { limit: 1 });
  }
  
  async function getRowsWithRelations() {
    const em = orm.em.fork();
    console.time('mikroORM getRowsWithRelations');
    const promises = [];
    for (let i = 0; i < ITERATIONS; i++) {
      const p = em.find(Order, {}, {
        populate: ['customer', 'employee', 'orderDetails.product.supplier'],
        orderBy: { employeeId: 'asc' }
      }).then(JSON.stringify);
      promises.push(p);
    }
    await Promise.all(promises);
    console.timeEnd('mikroORM getRowsWithRelations');
  }
  

  await orm.close(true);
}


main().catch(err => {
  console.error(err);
  process.exit(1);
});
