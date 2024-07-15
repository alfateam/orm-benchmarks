import { InferModel, relations } from "drizzle-orm";
import {
  sqliteTable,
  text,
  foreignKey,
  real,
  index,
  int,
} from "drizzle-orm/sqlite-core";

export const customers = sqliteTable(
  "customers",
  {
    id: text("id").primaryKey(),
    companyName: text("company_name").notNull(),
    contactName: text("contact_name").notNull(),
    contactTitle: text("contact_title").notNull(),
    address: text("address").notNull(),
    city: text("city").notNull(),
    postalCode: text("postal_code"),
    region: text("region"),
    country: text("country").notNull(),
    phone: text("phone").notNull(),
    fax: text("fax"),
  }
);

export const employees = sqliteTable(
  "employees",
  {
    id: int("id").primaryKey(),
    lastName: text("last_name").notNull(),
    firstName: text("first_name"),
    title: text("title").notNull(),
    titleOfCourtesy: text("title_of_courtesy").notNull(),
    birthDate: text("birth_date").notNull(),
    hireDate: text("hire_date").notNull(),
    address: text("address").notNull(),
    city: text("city").notNull(),
    postalCode: text("postal_code").notNull(),
    country: text("country").notNull(),
    homePhone: text("home_phone").notNull(),
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

export const orders = sqliteTable("orders", {
  id: text("id").primaryKey(),
  orderDate: text("order_date").notNull(),
  requiredDate: text("required_date").notNull(),
  shippedDate: text("shipped_date"),
  shipVia: int("ship_via").notNull(),
  freight: real("freight").notNull(),
  shipName: text("ship_name").notNull(),
  shipCity: text("ship_city").notNull(),
  shipRegion: text("ship_region"),
  shipPostalCode: text("ship_postal_code"),
  shipCountry: text("ship_country").notNull(),

  customerId: text("customer_id")
    .notNull()
    .references(() => customers.id, { onDelete: "cascade" }),

  employeeId: int("employee_id")
    .notNull()
    .references(() => employees.id, { onDelete: "cascade" }),
});

export const suppliers = sqliteTable("suppliers", {
  id: int("id").primaryKey(),
  companyName: text("company_name").notNull(),
  contactName: text("contact_name").notNull(),
  contactTitle: text("contact_title").notNull(),
  address: text("address").notNull(),
  city: text("city").notNull(),
  region: text("region"),
  postalCode: text("postal_code").notNull(),
  country: text("country").notNull(),
  phone: text("phone").notNull(),
});

export const products = sqliteTable(
  "products",
  {
    id: int("id").primaryKey(),
    name: text("name").notNull(),
    quantityPerUnit: text("qt_per_unit").notNull(),
    unitPrice: real("unit_price").notNull(),
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

export const details = sqliteTable(
  "order_details",
  {
    unitPrice: real("unit_price").notNull(),
    quantity: int("quantity").notNull(),
    discount: real("discount").notNull(),

    orderId: text("order_id")
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
