import { combineReducers } from "redux";
import products from "./products.reducer";
import product from "./product.reducer";

import offers from "./offers.reducer";
import offer from "./offer.reducer";
import orders from "./orders.reducer";
import order from "./order.reducer";
import category from "./category.reducer";
import categories from "./categories.reducer";
import subcategory from "./subcategory.reducer";
import subSubcategory from "./sub-subcategory.reducer";

const reducer = combineReducers({
	products,
	product,
	offer,
	offers,
	category,
	categories,
	orders,
	order,
	subcategory,
	sub_subcategory: subSubcategory
});

export default reducer;
