import orange from 'orange-orm';

const map = orange.map(x => {
    return {
        orders: x.table('orders').map(({ column }) => {
            return {
                id: column('id').string().primary(),
                orderDate: column('order_date').date(),
                requiredDate: column('required_date').date(),
                shippedDate: column('shipped_date').date(),
                shipVia: column('ship_via').numeric(),
                freight: column('freight').numeric(),
                shipName: column('ship_name').string(),
                shipCity: column('ship_city').string(),
                shipRegion: column('ship_region').string(),
                shipPostalCode: column('ship_postal_code').string(),
                shipCountry: column('ship_country').string(),
                customerId: column('customer_id').string(),
                employeeId: column('employee_id').string(),
            };
        }),
        details: x.table('order_details').map( ({ column }) => {
            return {
                orderId: column("order_id").string().primary(),
                productId: column("product_id").string().primary(),
                unitPrice: column("unit_price").numeric(),
                quantity: column("quantity").numeric(),
                discount: column("discount").numeric(),
            };
        }),
        customers: x.table('customers').map( ({ column }) => {
            return {
                id: column("id").string().primary(),
                companyName: column("company_name").string(),
                contactName: column("contact_name").string(),
                contactTitle: column("contact_title").string(),
                address: column("address").string(),
                city: column("city").string(),
                postalCode: column("postal_code").string(),
                region: column("region").string(),
                country: column("country").string(),
                phone: column("phone").string(),
                fax: column("fax").string(),       
            }
        }),
    }
}).map(x => {
    return {
        orders: x.orders.map(v => {
            return {
                details: v.hasMany(x.details).by('orderId')
            };

        })
    }
}).map(x => {
    return {
        customers: x.customers.map(v => {
            return {
                orders: v.hasMany(x.orders).by('customerId')
            }
        })
    }
});

export default map;