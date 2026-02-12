import assert from 'node:assert/strict';
import test from 'node:test';

export const WARMUP_ORDER_IDS = ['10248', '10250'] as const;

export type NormalizedSupplier = {
  id: string;
  companyName: string | null;
  contactName: string | null;
  contactTitle: string | null;
  city: string | null;
  country: string | null;
  phone: string | null;
};

export type NormalizedProduct = {
  id: string;
  name: string | null;
  quantityPerUnit: string | null;
  unitPrice: number;
  unitsInStock: number;
  unitsOnOrder: number;
  reorderLevel: number;
  discontinued: number;
  supplierId: string;
  supplier: NormalizedSupplier;
};

export type NormalizedDetail = {
  unitPrice: number;
  quantity: number;
  discount: number;
  orderId: string;
  productId: string;
  product: NormalizedProduct;
};

export type NormalizedCustomer = {
  id: string;
  companyName: string | null;
  contactName: string | null;
  contactTitle: string | null;
  city: string | null;
  country: string | null;
  phone: string | null;
};

export type NormalizedEmployee = {
  id: string;
  lastName: string | null;
  firstName: string | null;
  title: string | null;
  titleOfCourtesy: string | null;
  birthDate: string | null;
  hireDate: string | null;
  city: string | null;
  country: string | null;
  homePhone: string | null;
  extension: number;
};

export type NormalizedOrder = {
  id: string;
  orderDate: string | null;
  requiredDate: string | null;
  shippedDate: string | null;
  shipVia: number;
  freight: number;
  shipName: string | null;
  shipCity: string | null;
  shipRegion: string | null;
  shipPostalCode: string | null;
  shipCountry: string | null;
  customerId: string;
  employeeId: string;
  customer: NormalizedCustomer;
  employee: NormalizedEmployee;
  details: NormalizedDetail[];
};

const EXPECTED_WARMUP_ORDERS: NormalizedOrder[] = [
  {
    id: '10248',
    orderDate: '1996-07-04',
    requiredDate: '1996-08-01',
    shippedDate: '1996-07-16',
    shipVia: 3,
    freight: 32.38,
    shipName: 'Vins et alcools Chevalier',
    shipCity: 'Reims',
    shipRegion: null,
    shipPostalCode: '51100',
    shipCountry: 'France',
    customerId: 'VINET',
    employeeId: '5',
    customer: {
      id: 'VINET',
      companyName: 'Vins et alcools Chevalier',
      contactName: 'Paul Henriot',
      contactTitle: 'Accounting Manager',
      city: 'Reims',
      country: 'France',
      phone: '26.47.15.10',
    },
    employee: {
      id: '5',
      lastName: 'Buchanan',
      firstName: 'Steven',
      title: 'Sales Manager',
      titleOfCourtesy: 'Mr.',
      birthDate: '1955-03-04',
      hireDate: '1993-10-17',
      city: 'London',
      country: 'SW1 8JR',
      homePhone: '(71) 555-4848',
      extension: 3453,
    },
    details: [
      {
        unitPrice: 14,
        quantity: 12,
        discount: 0,
        orderId: '10248',
        productId: '11',
        product: {
          id: '11',
          name: 'Queso Cabrales',
          quantityPerUnit: '1 kg pkg.',
          unitPrice: 21,
          unitsInStock: 22,
          unitsOnOrder: 30,
          reorderLevel: 30,
          discontinued: 0,
          supplierId: '5',
          supplier: {
            id: '5',
            companyName: "Cooperativa de Quesos 'Las Cabras'",
            contactName: 'Antonio del Valle Saavedra',
            contactTitle: 'Export Administrator',
            city: 'Oviedo',
            country: 'Spain',
            phone: '(98) 598 76 54',
          },
        },
      },
      {
        unitPrice: 9.8,
        quantity: 10,
        discount: 0,
        orderId: '10248',
        productId: '42',
        product: {
          id: '42',
          name: 'Singaporean Hokkien Fried Mee',
          quantityPerUnit: '32 - 1 kg pkgs.',
          unitPrice: 14,
          unitsInStock: 26,
          unitsOnOrder: 0,
          reorderLevel: 0,
          discontinued: 1,
          supplierId: '20',
          supplier: {
            id: '20',
            companyName: 'Leka Trading',
            contactName: 'Chandra Leka',
            contactTitle: 'Owner',
            city: 'Singapore',
            country: 'Singapore',
            phone: '555-8787',
          },
        },
      },
      {
        unitPrice: 34.8,
        quantity: 5,
        discount: 0,
        orderId: '10248',
        productId: '72',
        product: {
          id: '72',
          name: 'Mozzarella di Giovanni',
          quantityPerUnit: '24 - 200 g pkgs.',
          unitPrice: 34.8,
          unitsInStock: 14,
          unitsOnOrder: 0,
          reorderLevel: 0,
          discontinued: 0,
          supplierId: '14',
          supplier: {
            id: '14',
            companyName: 'Formaggi Fortini s.r.l.',
            contactName: 'Elio Rossi',
            contactTitle: 'Sales Representative',
            city: 'Ravenna',
            country: 'Italy',
            phone: '(0544) 60323',
          },
        },
      },
    ],
  },
  {
    id: '10250',
    orderDate: '1996-07-08',
    requiredDate: '1996-08-05',
    shippedDate: '1996-07-12',
    shipVia: 2,
    freight: 65.83,
    shipName: 'Hanari Carnes',
    shipCity: 'Rio de Janeiro',
    shipRegion: 'RJ',
    shipPostalCode: '05454-876',
    shipCountry: 'Brazil',
    customerId: 'HANAR',
    employeeId: '4',
    customer: {
      id: 'HANAR',
      companyName: 'Hanari Carnes',
      contactName: 'Mario Pontes',
      contactTitle: 'Accounting Manager',
      city: 'Rio de Janeiro',
      country: 'Brazil',
      phone: '(21) 555-0091',
    },
    employee: {
      id: '4',
      lastName: 'Peacock',
      firstName: 'Margaret',
      title: 'Sales Representative',
      titleOfCourtesy: 'Mrs.',
      birthDate: '1937-09-19',
      hireDate: '1993-05-03',
      city: 'Redmond',
      country: 'USA',
      homePhone: '(206) 555-8122',
      extension: 5176,
    },
    details: [
      {
        unitPrice: 7.7,
        quantity: 10,
        discount: 0,
        orderId: '10250',
        productId: '41',
        product: {
          id: '41',
          name: "Jack's New England Clam Chowder",
          quantityPerUnit: '12 - 12 oz cans',
          unitPrice: 9.65,
          unitsInStock: 85,
          unitsOnOrder: 0,
          reorderLevel: 10,
          discontinued: 0,
          supplierId: '19',
          supplier: {
            id: '19',
            companyName: 'New England Seafood Cannery',
            contactName: 'Robb Merchant',
            contactTitle: 'Wholesale Account Agent',
            city: 'Boston',
            country: 'USA',
            phone: '(617) 555-3267',
          },
        },
      },
      {
        unitPrice: 42.4,
        quantity: 35,
        discount: 0.15,
        orderId: '10250',
        productId: '51',
        product: {
          id: '51',
          name: 'Manjimup Dried Apples',
          quantityPerUnit: '50 - 300 g pkgs.',
          unitPrice: 53,
          unitsInStock: 20,
          unitsOnOrder: 0,
          reorderLevel: 10,
          discontinued: 0,
          supplierId: '24',
          supplier: {
            id: '24',
            companyName: "G'day, Mate",
            contactName: 'Wendy Mackenzie',
            contactTitle: 'Sales Representative',
            city: 'Sydney',
            country: 'Australia',
            phone: '(02) 555-5914',
          },
        },
      },
      {
        unitPrice: 16.8,
        quantity: 15,
        discount: 0.15,
        orderId: '10250',
        productId: '65',
        product: {
          id: '65',
          name: 'Louisiana Fiery Hot Pepper Sauce',
          quantityPerUnit: '32 - 8 oz bottles',
          unitPrice: 21.05,
          unitsInStock: 76,
          unitsOnOrder: 0,
          reorderLevel: 0,
          discontinued: 0,
          supplierId: '2',
          supplier: {
            id: '2',
            companyName: 'New Orleans Cajun Delights',
            contactName: 'Shelley Burke',
            contactTitle: 'Order Administrator',
            city: 'New Orleans',
            country: 'USA',
            phone: '(100) 555-4822',
          },
        },
      },
    ],
  },
];

export function normalizeDate(value: unknown): string | null {
  if (value === null || value === undefined) return null;
  if (value instanceof Date) {
    return value.toISOString().slice(0, 10);
  }
  if (typeof value === 'string') {
    const trimmed = value.trim();
    return trimmed.length >= 10 ? trimmed.slice(0, 10) : trimmed;
  }
  if (typeof value === 'number') {
    return new Date(value).toISOString().slice(0, 10);
  }
  return String(value).slice(0, 10);
}

export function normalizeString(value: unknown): string | null {
  if (value === null || value === undefined) return null;
  return String(value);
}

export function normalizeNumber(value: unknown): number {
  if (value === null || value === undefined || value === '') return Number.NaN;
  const num = Number(value);
  if (Number.isNaN(num)) return Number.NaN;
  return Math.round(num * 10000) / 10000;
}

export function toId(value: unknown): string {
  if (value === null || value === undefined) return '';
  if (typeof value === 'number' && Number.isNaN(value)) return '';
  return String(value);
}

function resolveId(...candidates: unknown[]): string {
  for (const candidate of candidates) {
    if (candidate === null || candidate === undefined) continue;
    if (typeof candidate === 'number' && Number.isNaN(candidate)) continue;
    const asString = String(candidate);
    if (asString.length === 0 || asString === 'NaN') continue;
    return asString;
  }
  return '';
}

function toArray(value: unknown): unknown[] {
  if (value === null || value === undefined) return [];
  if (Array.isArray(value)) return value;
  if (typeof value === 'object' && value !== null) {
    const maybeCollection = value as { getItems?: () => unknown[]; items?: unknown[] };
    if (typeof maybeCollection.getItems === 'function') {
      return maybeCollection.getItems();
    }
    if (Array.isArray(maybeCollection.items)) {
      return maybeCollection.items;
    }
  }
  return [];
}

function normalizeSupplierLike(supplier: any): NormalizedSupplier {
  return {
    id: resolveId(supplier?.id),
    companyName: normalizeString(supplier?.companyName ?? supplier?.company_name),
    contactName: normalizeString(supplier?.contactName ?? supplier?.contact_name),
    contactTitle: normalizeString(supplier?.contactTitle ?? supplier?.contact_title),
    city: normalizeString(supplier?.city),
    country: normalizeString(supplier?.country),
    phone: normalizeString(supplier?.phone),
  };
}

function normalizeProductLike(product: any): NormalizedProduct {
  const supplier = product?.supplier ?? product?.suppliers;
  return {
    id: resolveId(product?.id),
    name: normalizeString(product?.name),
    quantityPerUnit: normalizeString(
      product?.quantityPerUnit ?? product?.qtPerUnit ?? product?.qt_per_unit
    ),
    unitPrice: normalizeNumber(product?.unitPrice ?? product?.unit_price),
    unitsInStock: normalizeNumber(product?.unitsInStock ?? product?.units_in_stock),
    unitsOnOrder: normalizeNumber(product?.unitsOnOrder ?? product?.units_on_order),
    reorderLevel: normalizeNumber(product?.reorderLevel ?? product?.reorder_level),
    discontinued: normalizeNumber(product?.discontinued),
    supplierId: resolveId(product?.supplierId, product?.supplier_id, supplier?.id),
    supplier: normalizeSupplierLike(supplier),
  };
}

function normalizeDetailLike(detail: any, orderIdFallback: string): NormalizedDetail {
  const product = detail?.product ?? detail?.products;
  const orderId = resolveId(
    detail?.orderId,
    detail?.order_id,
    detail?.order?.id,
    orderIdFallback
  );
  const productId = resolveId(detail?.productId, detail?.product_id, product?.id);
  return {
    unitPrice: normalizeNumber(detail?.unitPrice ?? detail?.unit_price),
    quantity: normalizeNumber(detail?.quantity),
    discount: normalizeNumber(detail?.discount),
    orderId,
    productId,
    product: normalizeProductLike(product),
  };
}

function normalizeCustomerLike(customer: any): NormalizedCustomer {
  return {
    id: resolveId(customer?.id),
    companyName: normalizeString(customer?.companyName ?? customer?.company_name),
    contactName: normalizeString(customer?.contactName ?? customer?.contact_name),
    contactTitle: normalizeString(customer?.contactTitle ?? customer?.contact_title),
    city: normalizeString(customer?.city),
    country: normalizeString(customer?.country),
    phone: normalizeString(customer?.phone),
  };
}

function normalizeEmployeeLike(employee: any): NormalizedEmployee {
  return {
    id: resolveId(employee?.id),
    lastName: normalizeString(employee?.lastName ?? employee?.last_name),
    firstName: normalizeString(employee?.firstName ?? employee?.first_name),
    title: normalizeString(employee?.title),
    titleOfCourtesy: normalizeString(employee?.titleOfCourtesy ?? employee?.title_of_courtesy),
    birthDate: normalizeDate(employee?.birthDate ?? employee?.birth_date),
    hireDate: normalizeDate(employee?.hireDate ?? employee?.hire_date),
    city: normalizeString(employee?.city),
    country: normalizeString(employee?.country),
    homePhone: normalizeString(employee?.homePhone ?? employee?.home_phone),
    extension: normalizeNumber(employee?.extension),
  };
}

export function normalizeOrderLike(order: any): NormalizedOrder {
  const detailsRaw = order?.details ?? order?.orderDetails ?? order?.order_details;
  const detailsArray = toArray(detailsRaw).map(detail =>
    normalizeDetailLike(detail, toId(order?.id))
  );

  return {
    id: resolveId(order?.id),
    orderDate: normalizeDate(order?.orderDate ?? order?.order_date),
    requiredDate: normalizeDate(order?.requiredDate ?? order?.required_date),
    shippedDate: normalizeDate(order?.shippedDate ?? order?.shipped_date),
    shipVia: normalizeNumber(order?.shipVia ?? order?.ship_via),
    freight: normalizeNumber(order?.freight),
    shipName: normalizeString(order?.shipName ?? order?.ship_name),
    shipCity: normalizeString(order?.shipCity ?? order?.ship_city),
    shipRegion: normalizeString(order?.shipRegion ?? order?.ship_region),
    shipPostalCode: normalizeString(order?.shipPostalCode ?? order?.ship_postal_code),
    shipCountry: normalizeString(order?.shipCountry ?? order?.ship_country),
    customerId: resolveId(order?.customerId, order?.customer_id, order?.customer?.id),
    employeeId: resolveId(order?.employeeId, order?.employee_id, order?.employee?.id),
    customer: normalizeCustomerLike(order?.customer),
    employee: normalizeEmployeeLike(order?.employee),
    details: detailsArray,
  };
}

function sortDetails(details: NormalizedDetail[]): NormalizedDetail[] {
  return [...details].sort((a, b) => a.productId.localeCompare(b.productId));
}

function normalizeOrders(orders: NormalizedOrder[]): NormalizedOrder[] {
  return [...orders]
    .map(order => ({
      ...order,
      details: sortDetails(order.details),
    }))
    .sort((a, b) => a.id.localeCompare(b.id));
}

export async function assertWarmupOrders(
  actualOrders: NormalizedOrder[],
  label: string
): Promise<void> {
  const expected = normalizeOrders(EXPECTED_WARMUP_ORDERS);
  const actual = normalizeOrders(actualOrders);
  await test(`warmup:${label}`, () => {
    assert.deepStrictEqual(actual, expected);
  });
  if (process.exitCode && process.exitCode !== 0) {
    throw new Error(`Warmup data check failed: ${label}`);
  }
}
