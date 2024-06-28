import { Entity, PrimaryKey, Property, ManyToOne, OneToMany, Collection, Index, Unique, type Rel } from '@mikro-orm/core';

@Entity({ tableName: 'customers' })
export class Customer {

  @PrimaryKey({ fieldName: 'id' })
  id!: string;

  @Property({ fieldName: 'company_name' })
  companyName!: string;

  @Property({ fieldName: 'contact_name' })
  contactName!: string;

  @Property({ fieldName: 'contact_title' })
  contactTitle!: string;

  @Property({ fieldName: 'address' })
  address!: string;

  @Property({ fieldName: 'city' })
  city!: string;

  @Property({ fieldName: 'postal_code', nullable: true })
  postalCode?: string;

  @Property({ fieldName: 'region', nullable: true })
  region?: string;

  @Property({ fieldName: 'country' })
  country!: string;

  @Property({ fieldName: 'phone' })
  phone!: string;

  @Property({ fieldName: 'fax', nullable: true })
  fax?: string;

  @OneToMany(() => Order, order => order.customer)
  orders = new Collection<Order>(this);
}

@Entity({ tableName: 'order_details' })
@Unique({ properties: ['orderId', 'productId'] })
export class OrderDetail {

  @Property({ fieldName: 'unit_price' })
  unitPrice!: number;

  @Property({ fieldName: 'quantity' })
  quantity!: number;

  @Property({ fieldName: 'discount' })
  discount!: number;

  @PrimaryKey({ fieldName: 'order_id', persist: false })
  orderId!: string;

  @PrimaryKey({ fieldName: 'product_id', persist: false })
  productId!: string;

  @ManyToOne(() => Order, { fieldName: 'order_id' })
  order!: Rel<Order>;

  @ManyToOne(() => Product, { fieldName: 'product_id' })
  product!: Rel<Product>;
}

@Entity({ tableName: 'employees' })
@Index({ properties: ['recipientId'] })
export class Employee {

  @PrimaryKey({ fieldName: 'id' })
  id!: string;

  @Property({ fieldName: 'last_name' })
  lastName!: string;

  @Property({ fieldName: 'first_name', nullable: true })
  firstName?: string;

  @Property({ fieldName: 'title' })
  title!: string;

  @Property({ fieldName: 'title_of_courtesy' })
  titleOfCourtesy!: string;

  @Property({ fieldName: 'birth_date' })
  birthDate!: Date;

  @Property({ fieldName: 'hire_date' })
  hireDate!: Date;

  @Property({ fieldName: 'address' })
  address!: string;

  @Property({ fieldName: 'city' })
  city!: string;

  @Property({ fieldName: 'postal_code' })
  postalCode!: string;

  @Property({ fieldName: 'country' })
  country!: string;

  @Property({ fieldName: 'home_phone' })
  homePhone!: string;

  @Property({ fieldName: 'extension' })
  extension!: number;

  @Property({ fieldName: 'notes' })
  notes!: string;

  @Property({ fieldName: 'recipient_id', nullable: true })
  recipientId?: string;

  @OneToMany(() => Order, order => order.employee)
  orders = new Collection<Order>(this);
}

@Entity({ tableName: 'orders' })
@Index({ properties: ['customerId'] })
@Index({ properties: ['employeeId'] })
export class Order {

  @PrimaryKey({ fieldName: 'id' })
  id!: string;

  @Property({ fieldName: 'order_date' })
  orderDate!: Date;

  @Property({ fieldName: 'required_date' })
  requiredDate!: Date;

  @Property({ fieldName: 'shipped_date', nullable: true })
  shippedDate?: Date;

  @Property({ fieldName: 'ship_via' })
  shipVia!: number;

  @Property({ fieldName: 'freight' })
  freight!: number;

  @Property({ fieldName: 'ship_name' })
  shipName!: string;

  @Property({ fieldName: 'ship_city' })
  shipCity!: string;

  @Property({ fieldName: 'ship_region', nullable: true })
  shipRegion?: string;

  @Property({ fieldName: 'ship_postal_code', nullable: true })
  shipPostalCode?: string;

  @Property({ fieldName: 'ship_country' })
  shipCountry!: string;

  @Property({ fieldName: 'customer_id', persist: false })
  customerId!: string;

  @Property({ fieldName: 'employee_id', persist: false })
  employeeId!: string;

  @ManyToOne(() => Customer, { fieldName: 'customer_id' })
  customer!: Rel<Customer>;

  @ManyToOne(() => Employee, { fieldName: 'employee_id' })
  employee!: Rel<Employee>;

  @OneToMany(() => OrderDetail, orderDetail => orderDetail.order)
  orderDetails = new Collection<OrderDetail>(this);
}

@Entity({ tableName: 'products' })
@Index({ properties: ['supplierId'] })
export class Product {

  @PrimaryKey({ fieldName: 'id' })
  id!: string;

  @Property({ fieldName: 'name' })
  name!: string;

  @Property({ fieldName: 'qt_per_unit' })
  qtPerUnit!: string;

  @Property({ fieldName: 'unit_price' })
  unitPrice!: number;

  @Property({ fieldName: 'units_in_stock' })
  unitsInStock!: number;

  @Property({ fieldName: 'units_on_order' })
  unitsOnOrder!: number;

  @Property({ fieldName: 'reorder_level' })
  reorderLevel!: number;

  @Property({ fieldName: 'discontinued' })
  discontinued!: number;

  @Property({ fieldName: 'supplier_id', persist: false })
  supplierId!: string;

  @ManyToOne(() => Supplier, { fieldName: 'supplier_id' })
  supplier!: Rel<Supplier>;

  @OneToMany(() => OrderDetail, orderDetail => orderDetail.product)
  orderDetails = new Collection<OrderDetail>(this);
}

@Entity({ tableName: 'suppliers' })
export class Supplier {

  @PrimaryKey({ fieldName: 'id' })
  id!: string;

  @Property({ fieldName: 'company_name' })
  companyName!: string;

  @Property({ fieldName: 'contact_name' })
  contactName!: string;

  @Property({ fieldName: 'contact_title' })
  contactTitle!: string;

  @Property({ fieldName: 'address' })
  address!: string;

  @Property({ fieldName: 'city' })
  city!: string;

  @Property({ fieldName: 'region', nullable: true })
  region?: string;

  @Property({ fieldName: 'postal_code' })
  postalCode!: string;

  @Property({ fieldName: 'country' })
  country!: string;

  @Property({ fieldName: 'phone' })
  phone!: string;

  @OneToMany(() => Product, product => product.supplier)
  products = new Collection<Product>(this);
}
