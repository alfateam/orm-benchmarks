import { Entity, PrimaryKey, Property, ManyToOne, OneToMany, Collection, Index, EntityRepositoryType, Type } from '@mikro-orm/core';
import { EntityRepository } from '@mikro-orm/postgresql';

@Entity({ tableName: 'customers' })
export class Customer {

  @PrimaryKey({ name: 'id' })
  id: string;

  @Property({ name: 'company_name' })
  companyName: string;

  @Property({ name: 'contact_name' })
  contactName: string;

  @Property({ name: 'contact_title' })
  contactTitle: string;

  @Property({ name: 'address' })
  address: string;

  @Property({ name: 'city' })
  city: string;

  @Property({ name: 'postal_code', nullable: true })
  postalCode?: string;

  @Property({ name: 'region', nullable: true })
  region?: string;

  @Property({ name: 'country' })
  country: string;

  @Property({ name: 'phone' })
  phone: string;

  @Property({ name: 'fax', nullable: true })
  fax?: string;

  @OneToMany(() => Order, order => order.customer)
  orders = new Collection<Order>(this);
}

@Entity({ tableName: 'order_details' })
@Index({ properties: ['orderId', 'productId'], unique: true })
export class OrderDetail {

  @Property({ name: 'unit_price' })
  unitPrice: number;

  @Property({ name: 'quantity' })
  quantity: number;

  @Property({ name: 'discount' })
  discount: number;

  @PrimaryKey({ name: 'order_id' })
  orderId: string;

  @PrimaryKey({ name: 'product_id' })
  productId: string;

  @ManyToOne(() => Order, { fieldName: 'order_id' })
  order: Order;

  @ManyToOne(() => Product, { fieldName: 'product_id' })
  product: Product;
}

@Entity({ tableName: 'employees' })
@Index({ properties: ['recipientId'] })
export class Employee {

  @PrimaryKey({ name: 'id' })
  id: string;

  @Property({ name: 'last_name' })
  lastName: string;

  @Property({ name: 'first_name', nullable: true })
  firstName?: string;

  @Property({ name: 'title' })
  title: string;

  @Property({ name: 'title_of_courtesy' })
  titleOfCourtesy: string;

  @Property({ name: 'birth_date' })
  birthDate: Date;

  @Property({ name: 'hire_date' })
  hireDate: Date;

  @Property({ name: 'address' })
  address: string;

  @Property({ name: 'city' })
  city: string;

  @Property({ name: 'postal_code' })
  postalCode: string;

  @Property({ name: 'country' })
  country: string;

  @Property({ name: 'home_phone' })
  homePhone: string;

  @Property({ name: 'extension' })
  extension: number;

  @Property({ name: 'notes' })
  notes: string;

  @Property({ name: 'recipient_id', nullable: true })
  recipientId?: string;

  @OneToMany(() => Order, order => order.employee)
  orders = new Collection<Order>(this);
}

@Entity({ tableName: 'orders' })
@Index({ properties: ['customerId'] })
@Index({ properties: ['employeeId'] })
export class Order {

  @PrimaryKey({ name: 'id' })
  id: string;

  @Property({ name: 'order_date' })
  orderDate: Date;

  @Property({ name: 'required_date' })
  requiredDate: Date;

  @Property({ name: 'shipped_date', nullable: true })
  shippedDate?: Date;

  @Property({ name: 'ship_via' })
  shipVia: number;

  @Property({ name: 'freight' })
  freight: number;

  @Property({ name: 'ship_name' })
  shipName: string;

  @Property({ name: 'ship_city' })
  shipCity: string;

  @Property({ name: 'ship_region', nullable: true })
  shipRegion?: string;

  @Property({ name: 'ship_postal_code', nullable: true })
  shipPostalCode?: string;

  @Property({ name: 'ship_country' })
  shipCountry: string;

  @Property({ name: 'customer_id' })
  customerId: string;

  @Property({ name: 'employee_id' })
  employeeId: string;

  @ManyToOne(() => Customer, { fieldName: 'customer_id' })
  customer: Customer;

  @ManyToOne(() => Employee, { fieldName: 'employee_id' })
  employee: Employee;

  @OneToMany(() => OrderDetail, orderDetail => orderDetail.order)
  orderDetails = new Collection<OrderDetail>(this);
}

@Entity({ tableName: 'products' })
@Index({ properties: ['supplierId'] })
export class Product {

  @PrimaryKey({ name: 'id' })
  id: string;

  @Property({ name: 'name' })
  name: string;

  @Property({ name: 'qt_per_unit' })
  qtPerUnit: string;

  @Property({ name: 'unit_price' })
  unitPrice: number;

  @Property({ name: 'units_in_stock' })
  unitsInStock: number;

  @Property({ name: 'units_on_order' })
  unitsOnOrder: number;

  @Property({ name: 'reorder_level' })
  reorderLevel: number;

  @Property({ name: 'discontinued' })
  discontinued: number;

  @Property({ name: 'supplier_id' })
  supplierId: string;

  @ManyToOne(() => Supplier, { fieldName: 'supplier_id' })
  supplier: Supplier;

  @OneToMany(() => OrderDetail, orderDetail => orderDetail.product)
  orderDetails = new Collection<OrderDetail>(this);
}

@Entity({ tableName: 'suppliers' })
export class Supplier {

  @PrimaryKey({ name: 'id' })
  id: string;

  @Property({ name: 'company_name' })
  companyName: string;

  @Property({ name: 'contact_name' })
  contactName: string;

  @Property({ name: 'contact_title' })
  contactTitle: string;

  @Property({ name: 'address' })
  address: string;

  @Property({ name: 'city' })
  city: string;

  @Property({ name: 'region', nullable: true })
  region?: string;

  @Property({ name: 'postal_code' })
  postalCode: string;

  @Property({ name: 'country' })
  country: string;

  @Property({ name: 'phone' })
  phone: string;

  @OneToMany(() => Product, product => product.supplier)
  products = new Collection<Product>(this);
}
