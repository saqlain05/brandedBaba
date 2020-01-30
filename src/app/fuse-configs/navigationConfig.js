const navigationConfig = [
	{
		id: "applications",
		title: "Applications",
		type: "group",
		icon: "apps",
		children: [
			{
				id: "e-commerce-products",
				title: "Products",
				type: "item",
				url: "/apps/e-commerce/products",
				exact: true
			},

			{
				id: "e-commerce-new-product",
				title: "New Product",
				type: "item",
				url: "/apps/e-commerce/products/new",
				exact: true
			},
			{
				id: "e-commerce-orders",
				title: "Orders",
				type: "item",
				url: "/apps/e-commerce/orders",
				exact: true
			},
			{
				id: "e-commerce-order-detail",
				title: "Order Detail",
				type: "item",
				url: "/apps/e-commerce/orders/1",
				exact: true
			}
		]
	}
];

export default navigationConfig;
