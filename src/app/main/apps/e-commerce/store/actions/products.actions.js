import axios from "axios";

export const GET_PRODUCTS = "[E-COMMERCE APP] GET PRODUCTS";

export const DELETE_PRODUCT = "[E-COMMERCE APP] DELETE PRODUCT";
export const SET_PRODUCTS_SEARCH_TEXT =
	"[E-COMMERCE APP] SET PRODUCTS SEARCH TEXT";

export function getProducts() {
	const request = axios.get("http://13.235.187.206/api/products");
	console.log(request);
	return (dispatch) =>
		request.then((response) =>
			dispatch({
				type: GET_PRODUCTS,
				payload: response.data.products
			})
		);
}

export function deleteProduct(productId) {
	const request = axios.delete(
		`http://13.235.187.206/api/products/${productId}`
	);
	return (dispatch) =>
		request.then((response) =>
			dispatch({
				type: DELETE_PRODUCT
			})
		);
}

export function setProductsSearchText(event) {
	return {
		type: SET_PRODUCTS_SEARCH_TEXT,
		searchText: event.target.value
	};
}
