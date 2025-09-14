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
                employeeId: column('employee_id').numeric(),
            };
        }),
        product: x.table('products').map( ({ column }) => {
            return {
                id: column("id").string().primary(),
                name: column("name").string(),
                quantityPerUnit: column("unit_price").numeric(),
                unitPrice: column("unit_price").numeric(),
                unitsInStock: column("units_in_stock").numeric(),
                unitsOnOrder: column("units_on_order").numeric(),
                reorderLevel: column("reorder_level").numeric(),
                discontinued: column("discontinued").numeric(),
                supplierId: column("supplier_id").numeric(),
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
        employees: x.table('employees').map( ({ column }) => {
            return {
                id: column("id").numeric().primary(),
                lastName: column("last_name").string(),
                firstName: column("first_name").string(),
                title: column("title").string(),
                titleOfCourtesy: column("title_of_courtesy").string(),
                birthDate: column("birth_date").date(),
                hireDate: column("hire_date").date(),
                address: column("address").string(),
                city: column("city").string(),
                postalCode: column("postal_code").string(),
                country: column("country").string(),
                homePhone: column("home_phone").string(),
                extension: column("extension").numeric(),
                notes: column("notes").string(),
                recipient_id: column("recipient_id").numeric(),
            }
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
        suppliers: x.table('suppliers').map( ({ column }) => {
            return {
                id: column("id").numeric().primary(),
                companyName: column("company_name").string(),
                contactName: column("contact_name").string(),
                contactTitle: column("contact_title").string(),
                address: column("address").string(),
                city: column("city").string(),
                postalCode: column("postal_code").string(),
                region: column("region").string(),
                country: column("country").string(),
                phone: column("phone").string(),
            }
        }),
    }
}).map(x => {
    return {
        product: x.product.map(v => {
            return {
                supplier: v.references(x.suppliers).by('supplierId')
            };
            
        }),
        details: x.details.map(v => {
            return {
                product: v.references(x.product).by('productId')
            };
    
        }),
        orders: x.orders.map(v => {
            return {
                details: v.hasMany(x.details).by('orderId'),
                customer: v.references(x.customers).by('customerId'),
                employee: v.references(x.employees).by('employeeId'),
            };
    
        }),
        customers: x.customers.map(v => {
            return {
                orders: v.hasMany(x.orders).by('customerId')
            }
        })
    }
});

export default map;