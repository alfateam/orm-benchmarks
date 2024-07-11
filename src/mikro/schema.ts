import { EntitySchema, Collection, type Rel } from '@mikro-orm/core';

// Customer entity
export class Customer {  
  id!: string;
  companyName!: string;
  contactName!: string;
  contactTitle!: string;
  address!: string;
  city!: string;
  postalCode?: string;
  region?: string;
  country!: string;
  phone!: string;
  fax?: string;
  orders = new Collection<Order>(this);
}

export const CustomerSchema = new EntitySchema<Customer>({
  name: 'Customer',
  tableName: 'customers',
  properties: {
    id: { type: 'string', primary: true },
    companyName: { type: 'string', fieldName: 'company_name' },
    contactName: { type: 'string', fieldName: 'contact_name' },
    contactTitle: { type: 'string', fieldName: 'contact_title' },
    address: { type: 'string' },
    city: { type: 'string' },
    postalCode: { type: 'string', nullable: true, fieldName: 'postal_code' },
    region: { type: 'string', nullable: true },
    country: { type: 'string' },
    phone: { type: 'string' },
    fax: { type: 'string', nullable: true },
    orders: { kind: '1:m', entity: () => Order, mappedBy: 'customer' },
  },
});

export class OrderDetail {
  unitPrice!: number;
  quantity!: number;
  discount!: number;
  orderId!: string;
  productId!: string;
  order!: Rel<Order>;
  product!: Rel<Product>;
}

export const OrderDetailSchema = new EntitySchema<OrderDetail>({
  name: 'OrderDetail',
  tableName: 'order_details',
  properties: {
    unitPrice: { type: 'number', fieldName: 'unit_price' },
    quantity: { type: 'number' },
    discount: { type: 'number' },
    orderId: { type: 'string', primary: true, persist: false},
    productId: { type: 'string', primary: true, persist: false },
    order: { kind: 'm:1', entity: () => Order,  fieldName: 'order_id', primary: true  },
    product: { kind: 'm:1', entity: () => Product, fieldName: 'product_id', primary: true },
  },
});

export class Employee {
  id!: string;
  lastName!: string;
  firstName?: string;
  title!: string;
  titleOfCourtesy!: string;
  birthDate!: Date;
  hireDate!: Date;
  address!: string;
  city!: string;
  postalCode!: string;
  country!: string;
  homePhone!: string;
  extension!: number;
  notes!: string;
  recipientId?: string;
  orders = new Collection<Order>(this);
}

export const EmployeeSchema = new EntitySchema<Employee>({
  name: 'Employee',
  tableName: 'employees',
  properties: {
    id: { type: 'string', primary: true },
    lastName: { type: 'string', fieldName: 'last_name' },
    firstName: { type: 'string', nullable: true, fieldName: 'first_name' },
    title: { type: 'string' },
    titleOfCourtesy: { type: 'string', fieldName: 'title_of_courtesy' },
    birthDate: { type: 'Date', fieldName: 'birth_date' },
    hireDate: { type: 'Date', fieldName: 'hire_date' },
    address: { type: 'string' },
    city: { type: 'string' },
    postalCode: { type: 'string', fieldName: 'postal_code' },
    country: { type: 'string' },
    homePhone: { type: 'string', fieldName: 'home_phone' },
    extension: { type: 'number' },
    notes: { type: 'string' },
    recipientId: { type: 'string', nullable: true, fieldName: 'recipient_id' },
    orders: { kind: '1:m', entity: () => Order, mappedBy: 'employee' },
  },
});

// Order entity
export class Order {
  id!: string;
  orderDate!: Date;
  requiredDate!: Date;
  shippedDate?: Date;
  shipVia!: number;
  freight!: number;
  shipName!: string;
  shipCity!: string;
  shipRegion?: string;
  shipPostalCode?: string;
  shipCountry!: string;
  customerId!: string;
  employeeId!: string;
  customer!: Rel<Customer>;
  employee!: Rel<Employee>;
  orderDetails = new Collection<OrderDetail>(this);
}

export const OrderSchema = new EntitySchema<Order>({
  name: 'Order',
  tableName: 'orders',
  properties: {
    id: { type: 'string', primary: true },
    orderDate: { type: 'Date', fieldName: 'order_date' },
    requiredDate: { type: 'Date', fieldName: 'required_date' },
    shippedDate: { type: 'Date', nullable: true, fieldName: 'shipped_date' },
    shipVia: { type: 'number', fieldName: 'ship_via' },
    freight: { type: 'number' },
    shipName: { type: 'string', fieldName: 'ship_name' },
    shipCity: { type: 'string', fieldName: 'ship_city' },
    shipRegion: { type: 'string', nullable: true, fieldName: 'ship_region' },
    shipPostalCode: { type: 'string', nullable: true, fieldName: 'ship_postal_code' },
    shipCountry: { type: 'string', fieldName: 'ship_country' },
    customerId: { type: 'string', fieldName: 'customer_id', persist: false },
    employeeId: { type: 'string', fieldName: 'employee_id', persist: false },
    customer: { kind: 'm:1', entity: () => Customer, fieldName:  'customer_id' },
    employee: { kind: 'm:1', entity: () => Employee, fieldName: 'employee_id' },
    orderDetails: { kind: '1:m', entity: () => OrderDetail, mappedBy: 'order' },
  },
});

export class Product {
  id!: string;
  name!: string;
  qtPerUnit!: string;
  unitPrice!: number;
  unitsInStock!: number;
  unitsOnOrder!: number;
  reorderLevel!: number;
  discontinued!: number;
  supplierId!: string;
  supplier!: Rel<Supplier>;
  orderDetails = new Collection<OrderDetail>(this);
}

export const ProductSchema = new EntitySchema<Product>({
  name: 'Product',
  tableName: 'products',
  properties: {
    id: { type: 'string', primary: true },
    name: { type: 'string' },
    qtPerUnit: { type: 'string', fieldName: 'qt_per_unit' },
    unitPrice: { type: 'number', fieldName: 'unit_price' },
    unitsInStock: { type: 'number', fieldName: 'units_in_stock' },
    unitsOnOrder: { type: 'number', fieldName: 'units_on_order' },
    reorderLevel: { type: 'number', fieldName: 'reorder_level' },
    discontinued: { type: 'number' },
    supplierId: { type: 'string', fieldName: 'supplier_id', persist: false },
    supplier: { kind: 'm:1', entity: () => Supplier, fieldName: 'supplier_id' },
    orderDetails: { kind: '1:m', entity: () => OrderDetail, mappedBy: 'product' },
  },
});

export class Supplier {
  id!: string;
  companyName!: string;
  contactName!: string;
  contactTitle!: string;
  address!: string;
  city!: string;
  region?: string;
  postalCode!: string;
  country!: string;
  phone!: string;
  products = new Collection<Product>(this);
}

export const SupplierSchema = new EntitySchema<Supplier>({
  name: 'Supplier',
  tableName: 'suppliers',
  properties: {
    id: { type: 'string', primary: true },
    companyName: { type: 'string', fieldName: 'company_name' },
    contactName: { type: 'string', fieldName: 'contact_name' },
    contactTitle: { type: 'string', fieldName: 'contact_title' },
    address: { type: 'string' },
    city: { type: 'string' },
    region: { type: 'string', nullable: true },
    postalCode: { type: 'string', fieldName: 'postal_code' },
    country: { type: 'string' },
    phone: { type: 'string' },
    products: { kind: '1:m', entity: () => Product, mappedBy: 'supplier' },
  },
});