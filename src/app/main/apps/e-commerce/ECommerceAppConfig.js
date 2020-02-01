import React from "react";
import { Redirect } from "react-router-dom";

export const ECommerceAppConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: "/apps/e-commerce/products/:productId",
			component: React.lazy(() => import("./product/Product"))
		},
		{
			path: "/apps/e-commerce/products",
			component: React.lazy(() => import("./products/Products"))
		},
		{
			path: "/apps/e-commerce/categories/:categoryId",
			component: React.lazy(() => import("./category/Category")),
			exact: true
		},
		{
			path:
				"/apps/e-commerce/categories/:categoryId/subcategory/:subcategoryId",
			component: React.lazy(() => import("./subcategory/Subcategory")),
			exact: true
		},
		{
			path:
				"/apps/e-commerce/categories/:categoryId/subcategory/:subcategoryId/sub-subcategory/:subSubcategoryId",
			component: React.lazy(() => import("./sub-subcategory/SubSubcategory")),
			exact: true
		},
		{
			path: "/apps/e-commerce/categories",
			component: React.lazy(() => import("./categories/Categories")),
			exact: true
		},
		{
			path: "/apps/e-commerce/orders/:orderId",
			component: React.lazy(() => import("./order/Order"))
		},
		{
			path: "/apps/e-commerce/orders",
			component: React.lazy(() => import("./orders/Orders"))
		},
		{
			path: "/apps/e-commerce",
			component: () => <Redirect to='/apps/e-commerce/products' />
		}
	]
};
