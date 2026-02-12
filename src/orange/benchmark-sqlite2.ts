import { exit } from 'node:process';
import db from './sqlite';
import orange from 'orange-orm';
import { WARMUP_ORDER_IDS, assertWarmupOrders, normalizeOrderLike } from '../bench/warmup-check';

const ITERATIONS = Number.parseInt(process.env.ITERATIONS);
const ROUNDS = Number.parseInt(process.env.ROUNDS);
const POOLSIZE = Number.parseInt(process.env.POOLSIZE)
const LOG = process.env.LOG === 'true';

const query = `
select
    "id",
    "order_date",
    "required_date",
    "shipped_date",
    "ship_via",
    "freight",
    "ship_name",
    "ship_city",
    "ship_region",
    "ship_postal_code",
    "ship_country",
    "customer_id",
    "employee_id",
    (
        select
            coalesce(
                json_group_array (
                    json_array (
                        "unit_price",
                        "quantity",
                        "discount",
                        "order_id",
                        "product_id",
                        (
                            select
                                json_array (
                                    "id",
                                    "name",
                                    "qt_per_unit",
                                    "unit_price",
                                    "units_in_stock",
                                    "units_on_order",
                                    "reorder_level",
                                    "discontinued",
                                    "supplier_id",
                                    (
                                        select
                                            json_array (
                                                "id",
                                                "company_name",
                                                "contact_name",
                                                "contact_title",
                                                "address",
                                                "city",
                                                "region",
                                                "postal_code",
                                                "country",
                                                "phone"
                                            ) as "data"
                                        from
                                            (
                                                select
                                                    *
                                                from
                                                    "suppliers" "orders_details_product_supplier"
                                                where
                                                    "orders_details_product_supplier"."id" = "orders_details_product"."supplier_id"
                                                limit
                                                    1.0
                                            ) "orders_details_product_supplier"
                                    )
                                ) as "data"
                            from
                                (
                                    select
                                        *
                                    from
                                        "products" "orders_details_product"
                                    where
                                        "orders_details_product"."id" = "orders_details"."product_id"
                                    limit
                                        1.0
                                ) "orders_details_product"
                        )
                    )
                ),
                json_array ()
            ) as "data"
        from
            "order_details" "orders_details"
        where
            "orders_details"."order_id" = "orders"."id"
    ) as "details",
    (
        select
            json_array (
                "id",
                "company_name",
                "contact_name",
                "contact_title",
                "address",
                "city",
                "postal_code",
                "region",
                "country",
                "phone",
                "fax"
            ) as "data"
        from
            (
                select
                    *
                from
                    "customers" "orders_customer"
                where
                    "orders_customer"."id" = "orders"."customer_id"
                limit
                    1.0
            ) "orders_customer"
    ) as "customer",
    (
        select
            json_array (
                "id",
                "last_name",
                "first_name",
                "title",
                "title_of_courtesy",
                "birth_date",
                "hire_date",
                "address",
                "city",
                "postal_code",
                "country",
                "home_phone",
                "extension",
                "notes",
                "recipient_id"
            ) as "data"
        from
            (
                select
                    *
                from
                    "employees" "orders_employee"
                where
                    "orders_employee"."id" = "orders"."employee_id"
                limit
                    1.0
            ) "orders_employee"
    ) as "employee"
from
    "orders" LIMIT 1
`;

const query2 = `
SELECT
    "id",
    "order_date",
    "required_date",
    "shipped_date",
    "ship_via",
    "freight",
    "ship_name",
    "ship_city",
    "ship_region",
    "ship_postal_code",
    "ship_country",
    "customer_id",
    "employee_id",
    (
        SELECT
            coalesce(
                json_group_array (
                    json_object (
                        'unit_price', "unit_price",
                        'quantity', "quantity",
                        'discount', "discount",
                        'order_id', "order_id",
                        'product_id', "product_id",
                        'product', (
                            SELECT
                                json_object (
                                    'id', "orders_details_product"."id",
                                    'name', "orders_details_product"."name",
                                    'qt_per_unit', "orders_details_product"."qt_per_unit",
                                    'unit_price', "orders_details_product"."unit_price",
                                    'units_in_stock', "orders_details_product"."units_in_stock",
                                    'units_on_order', "orders_details_product"."units_on_order",
                                    'reorder_level', "orders_details_product"."reorder_level",
                                    'discontinued', "orders_details_product"."discontinued",
                                    'supplier_id', "orders_details_product"."supplier_id",
                                    'supplier', (
                                        SELECT
                                            json_object (
                                                'id', "orders_details_product_supplier"."id",
                                                'company_name', "orders_details_product_supplier"."company_name",
                                                'contact_name', "orders_details_product_supplier"."contact_name",
                                                'contact_title', "orders_details_product_supplier"."contact_title",
                                                'address', "orders_details_product_supplier"."address",
                                                'city', "orders_details_product_supplier"."city",
                                                'region', "orders_details_product_supplier"."region",
                                                'postal_code', "orders_details_product_supplier"."postal_code",
                                                'country', "orders_details_product_supplier"."country",
                                                'phone', "orders_details_product_supplier"."phone"
                                            )
                                        FROM
                                            "suppliers" "orders_details_product_supplier"
                                        WHERE
                                            "orders_details_product_supplier"."id" = "orders_details_product"."supplier_id"
                                        LIMIT 1
                                    )
                                )
                            FROM
                                "products" "orders_details_product"
                            WHERE
                                "orders_details_product"."id" = "orders_details"."product_id"
                            LIMIT 1
                        )
                    )
                ),
                json_array()
            ) AS "data"
        FROM
            "order_details" "orders_details"
        WHERE
            "orders_details"."order_id" = "orders"."id"
    ) AS "details",
    (
        SELECT
            json_object (
                'id', "orders_customer"."id",
                'company_name', "orders_customer"."company_name",
                'contact_name', "orders_customer"."contact_name",
                'contact_title', "orders_customer"."contact_title",
                'address', "orders_customer"."address",
                'city', "orders_customer"."city",
                'postal_code', "orders_customer"."postal_code",
                'region', "orders_customer"."region",
                'country', "orders_customer"."country",
                'phone', "orders_customer"."phone",
                'fax', "orders_customer"."fax"
            )
        FROM
            "customers" "orders_customer"
        WHERE
            "orders_customer"."id" = "orders"."customer_id"
        LIMIT 1
    ) AS "customer",
    (
        SELECT
            json_object (
                'id', "orders_employee"."id",
                'last_name', "orders_employee"."last_name",
                'first_name', "orders_employee"."first_name",
                'title', "orders_employee"."title",
                'title_of_courtesy', "orders_employee"."title_of_courtesy",
                'birth_date', "orders_employee"."birth_date",
                'hire_date', "orders_employee"."hire_date",
                'address', "orders_employee"."address",
                'city', "orders_employee"."city",
                'postal_code', "orders_employee"."postal_code",
                'country', "orders_employee"."country",
                'home_phone', "orders_employee"."home_phone",
                'extension', "orders_employee"."extension",
                'notes', "orders_employee"."notes",
                'recipient_id', "orders_employee"."recipient_id"
            )
        FROM
            "employees" "orders_employee"
        WHERE
            "orders_employee"."id" = "orders"."employee_id"
        LIMIT 1
    ) AS "employee"
FROM
    "orders";

`;
const query3 = `
SELECT
    json_group_array(
        json_object(
            'id', "orders"."id",
            'order_date', "orders"."order_date",
            'required_date', "orders"."required_date",
            'shipped_date', "orders"."shipped_date",
            'ship_via', "orders"."ship_via",
            'freight', "orders"."freight",
            'ship_name', "orders"."ship_name",
            'ship_city', "orders"."ship_city",
            'ship_region', "orders"."ship_region",
            'ship_postal_code', "orders"."ship_postal_code",
            'ship_country', "orders"."ship_country",
            'customer_id', "orders"."customer_id",
            'employee_id', "orders"."employee_id",
            'details', (
                SELECT
                    coalesce(
                        json_group_array(
                            json_object(
                                'unit_price', "orders_details"."unit_price",
                                'quantity', "orders_details"."quantity",
                                'discount', "orders_details"."discount",
                                'order_id', "orders_details"."order_id",
                                'product_id', "orders_details"."product_id",
                                'product', (
                                    SELECT
                                        json_object(
                                            'id', "orders_details_product"."id",
                                            'name', "orders_details_product"."name",
                                            'qt_per_unit', "orders_details_product"."qt_per_unit",
                                            'unit_price', "orders_details_product"."unit_price",
                                            'units_in_stock', "orders_details_product"."units_in_stock",
                                            'units_on_order', "orders_details_product"."units_on_order",
                                            'reorder_level', "orders_details_product"."reorder_level",
                                            'discontinued', "orders_details_product"."discontinued",
                                            'supplier_id', "orders_details_product"."supplier_id",
                                            'supplier', (
                                                SELECT
                                                    json_object(
                                                        'id', "orders_details_product_supplier"."id",
                                                        'company_name', "orders_details_product_supplier"."company_name",
                                                        'contact_name', "orders_details_product_supplier"."contact_name",
                                                        'contact_title', "orders_details_product_supplier"."contact_title",
                                                        'address', "orders_details_product_supplier"."address",
                                                        'city', "orders_details_product_supplier"."city",
                                                        'region', "orders_details_product_supplier"."region",
                                                        'postal_code', "orders_details_product_supplier"."postal_code",
                                                        'country', "orders_details_product_supplier"."country",
                                                        'phone', "orders_details_product_supplier"."phone"
                                                    )
                                                FROM
                                                    "suppliers" "orders_details_product_supplier"
                                                WHERE
                                                    "orders_details_product_supplier"."id" = "orders_details_product"."supplier_id"
                                                LIMIT 1
                                            )
                                        )
                                    FROM
                                        "products" "orders_details_product"
                                    WHERE
                                        "orders_details_product"."id" = "orders_details"."product_id"
                                    LIMIT 1
                                )
                            )
                        ),
                        json_array()
                    )
                FROM
                    "order_details" "orders_details"
                WHERE
                    "orders_details"."order_id" = "orders"."id"
            ),
            'customer', (
                SELECT
                    json_object(
                        'id', "orders_customer"."id",
                        'company_name', "orders_customer"."company_name",
                        'contact_name', "orders_customer"."contact_name",
                        'contact_title', "orders_customer"."contact_title",
                        'address', "orders_customer"."address",
                        'city', "orders_customer"."city",
                        'postal_code', "orders_customer"."postal_code",
                        'region', "orders_customer"."region",
                        'country', "orders_customer"."country",
                        'phone', "orders_customer"."phone",
                        'fax', "orders_customer"."fax"
                    )
                FROM
                    "customers" "orders_customer"
                WHERE
                    "orders_customer"."id" = "orders"."customer_id"
                LIMIT 1
            ),
            'employee', (
                SELECT
                    json_object(
                        'id', "orders_employee"."id",
                        'last_name', "orders_employee"."last_name",
                        'first_name', "orders_employee"."first_name",
                        'title', "orders_employee"."title",
                        'title_of_courtesy', "orders_employee"."title_of_courtesy",
                        'birth_date', "orders_employee"."birth_date",
                        'hire_date', "orders_employee"."hire_date",
                        'address', "orders_employee"."address",
                        'city', "orders_employee"."city",
                        'postal_code', "orders_employee"."postal_code",
                        'country', "orders_employee"."country",
                        'home_phone', "orders_employee"."home_phone",
                        'extension', "orders_employee"."extension",
                        'notes', "orders_employee"."notes",
                        'recipient_id', "orders_employee"."recipient_id"
                    )
                FROM
                    "employees" "orders_employee"
                WHERE
                    "orders_employee"."id" = "orders"."employee_id"
                LIMIT 1
            )
        )
    ) AS "orders"
FROM (
    SELECT
        *
    FROM
        "orders"        
) "orders";

`;


// for sql logging:
if (LOG)
    orange.on('query', console.dir)

benchmark();

async function benchmark() {
	await warmup2();
    // console.time(`orange:pool ${POOLSIZE}:sqlite`);
    // for (let i = 0; i < ROUNDS; i++) {
    //     await getRowsWithRelations();        
    // }
    // console.timeEnd(`orange:pool ${POOLSIZE}:sqlite`)
	exit(0);
}


async function warmup2() {    
    const orders = await db.orders.getMany({
        where: x => x.id.in(WARMUP_ORDER_IDS),
        details: {
            product: {
                supplier: true
            }
        },
        customer: true,
        employee: true,
    });
    await assertWarmupOrders(orders.map(normalizeOrderLike), 'orange:sqlite2');
}


async function warmup() {    
    const orders = await db.orders.getMany({
        where: x => x.id.in(WARMUP_ORDER_IDS),
        details: {
            product: {
                supplier: true
            }
        },
        customer: true,
        employee: true,
    });
    await assertWarmupOrders(orders.map(normalizeOrderLike), 'orange:sqlite');
}

async function getRowsWithRelations() {
    const promises = [];
    for (let i = 0; i < ITERATIONS; i++) {        
        const p = db.orders.getAll({
            details: {
                product: {
                    supplier: true
                }        
            },
            customer: true,
            employee: true,
        // }).then(x => console.dir(x, {depth: Infinity}));
        }).then(JSON.stringify);
        promises.push(p);
    }
    await Promise.all(promises);
}
