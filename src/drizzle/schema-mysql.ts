import { InferModel, relations, sql } from "drizzle-orm";
import {
  mysqlTable,
  varchar,
  date,
  text,
  foreignKey,
  int,  
  decimal,
  index,
  serial,
} from "drizzle-orm/mysql-core";

export const customers = mysqlTable(
  "customers",
  {
    id: varchar("id", { length: 255 }).primaryKey(),
    companyName: text("company_name").notNull(),
    contactName: varchar("contact_name", { length: 255 }).notNull(),
    contactTitle: varchar("contact_title", { length: 255 }).notNull(),
    address: varchar("address", { length: 255 }).notNull(),
    city: varchar("city", { length: 255 }).notNull(),
    postalCode: varchar("postal_code", { length: 255 }),
    region: varchar("region", { length: 255 }),
    country: varchar("country", { length: 255 }).notNull(),
    phone: varchar("phone", { length: 255 }).notNull(),
    fax: varchar("fax", { length: 255 }),
  }
);

export const employees = mysqlTable(
  "employees",
  {
    id: serial("id").primaryKey(),
    lastName: varchar("last_name", { length: 255 }).notNull(),
    firstName: varchar("first_name", { length: 255 }),
    title: varchar("title", { length: 255 }).notNull(),
    titleOfCourtesy: varchar("title_of_courtesy", { length: 255 }).notNull(),
    birthDate: date("birth_date").notNull(),
    hireDate: date("hire_date").notNull(),
    address: varchar("address", { length: 255 }).notNull(),
    city: varchar("city", { length: 255 }).notNull(),
    postalCode: varchar("postal_code", { length: 255 }).notNull(),
    country: varchar("country", { length: 255 }).notNull(),
    homePhone: varchar("home_phone", { length: 255 }).notNull(),
    extension: int("extension").notNull(),
    notes: text("notes").notNull(),
    recipientId: int("recipient_id"),
  },
  (table) => ({
    recipientFk: foreignKey({
      columns: [table.recipientId],
      foreignColumns: [table.id],
    }),
    recipientIdx: index("recipient_idx").on(table.recipientId),
  })
);

export const orders = mysqlTable("orders", {
  id: varchar("id", { length: 255 }).primaryKey(),
  orderDate: date("order_date").notNull(),
  requiredDate: date("required_date").notNull(),
  shippedDate: date("shipped_date"),
  shipVia: int("ship_via").notNull(),
  freight: decimal("freight").notNull(),
  shipName: varchar("ship_name", { length: 255 }).notNull(),
  shipCity: varchar("ship_city", { length: 255 }).notNull(),
  shipRegion: varchar("ship_region", { length: 255 }),
  shipPostalCode: varchar("ship_postal_code", { length: 255 }),
  shipCountry: varchar("ship_country", { length: 255 }).notNull(),

  customerId: varchar("customer_id", { length: 255 })
    .notNull()
    .references(() => customers.id, { onDelete: "cascade" }),

  employeeId: int("employee_id")
    .notNull()
    .references(() => employees.id, { onDelete: "cascade" }),
});

export const suppliers = mysqlTable("suppliers", {
  id: serial("id").primaryKey(),
  companyName: varchar("company_name", { length: 255 }).notNull(),
  contactName: varchar("contact_name", { length: 255 }).notNull(),
  contactTitle: varchar("contact_title", { length: 255 }).notNull(),
  address: varchar("address", { length: 255 }).notNull(),
  city: varchar("city", { length: 255 }).notNull(),
  region: varchar("region", { length: 255 }),
  postalCode: varchar("postal_code", { length: 255 }).notNull(),
  country: varchar("country", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 255 }).notNull(),
});

export const products = mysqlTable(
  "products",
  {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    quantityPerUnit: varchar("qt_per_unit", { length: 255 }).notNull(),
    unitPrice: decimal("unit_price").notNull(),
    unitsInStock: int("units_in_stock").notNull(),
    unitsOnOrder: int("units_on_order").notNull(),
    reorderLevel: int("reorder_level").notNull(),
    discontinued: int("discontinued").notNull(),

    supplierId: int("supplier_id")
      .notNull()
      .references(() => suppliers.id, { onDelete: "cascade" }),
  },
  (table) => {
    return {
      supplierIdx: index("supplier_idx").on(table.supplierId),
    };
  }
);

export const details = mysqlTable(
  "order_details",
  {
    unitPrice: decimal("unit_price").notNull(),
    quantity: int("quantity").notNull(),
    discount: decimal("discount").notNull(),

    orderId: varchar("order_id", { length: 255 })
      .notNull()
      .references(() => orders.id, { onDelete: "cascade" }),

    productId: int("product_id")
      .notNull()
      .references(() => products.id, { onDelete: "cascade" }),
  },
  (t) => {
    return {
      orderIdIdx: index("order_id_idx").on(t.orderId),
      productIdIdx: index("product_id_idx").on(t.productId),
    };
  }
);

export const customersRelations = relations(customers, (r) => {
  return {
    orders: r.many(orders),
    // products: r.many(products)
  };
});

export const ordersRelations = relations(orders, (r) => {
  return {
    details: r.many(details),
    customer: r.one(customers, {
      fields: [orders.customerId],
      references: [customers.id],
    }),
    employee: r.one(employees, {
      fields: [orders.employeeId],
      references: [employees.id],
    }),

    // products: r.many(products)
  };
});

export const detailsRelations = relations(details, (r) => {
  return {
    order: r.one(orders, {
      fields: [details.orderId],
      references: [orders.id],
    }),
    product: r.one(products, {
      fields: [details.productId],
      references: [products.id],
    }),
  };
});

export const employeesRelations = relations(employees, (r) => {
  return {
    recipient: r.one(employees, {
      fields: [employees.recipientId],
      references: [employees.id],
    }),
  };
});

export const productsRelations = relations(products, (r) => {
  return {
    supplier: r.one(suppliers, {
      fields: [products.supplierId],
      references: [suppliers.id],
    }),
  };
});

export type Customer = InferModel<typeof customers>;
export type CustomerInsert = InferModel<typeof customers, "insert">;
export type Employee = InferModel<typeof employees>;
export type EmployeeInsert = InferModel<typeof employees, "insert">;
export type Order = InferModel<typeof orders>;
export type OrderInsert = InferModel<typeof orders, "insert">;
export type Supplier = InferModel<typeof suppliers>;
export type SupplierInsert = InferModel<typeof suppliers, "insert">;
export type Product = InferModel<typeof products>;
export type ProductInsert = InferModel<typeof products, "insert">;
export type Detail = InferModel<typeof details>;
export type DetailInsert = InferModel<typeof details, "insert">;
