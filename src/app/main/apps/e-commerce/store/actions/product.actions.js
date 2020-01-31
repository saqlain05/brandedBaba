import axios from "axios";
import { showMessage } from "app/store/actions/fuse";

export const GET_PRODUCT = "[E-COMMERCE APP] GET PRODUCT";
export const SAVE_PRODUCT = "[E-COMMERCE APP] SAVE PRODUCT";

export function getProduct(id) {
	const request = axios.get(`http://13.233.225.39/api/products/${id}`);

	return (dispatch) =>
		request.then((response) => {
			return dispatch({
				type: GET_PRODUCT,
				payload: response.data.product
			});
		});
}

export function saveProduct(data) {
	console.log(data);
	const request = axios.post(
		`http://localhost:8000/api/products/${data.id}`,
		data
	);

	return (dispatch) =>
		request.then((response) => {
			dispatch(showMessage({ message: "Product Saved" }));

			return dispatch({
				type: SAVE_PRODUCT,
				payload: response.data
			});
		});
}

export function updateProduct(data) {
	console.log(data);
	const request = axios.put(
		`http://localhost:8000/api/products/${data.id}`,
		data
	);

	return (dispatch) =>
		request.then((response) => {
			dispatch(showMessage({ message: "Product Saved" }));

			return dispatch({
				type: SAVE_PRODUCT,
				payload: response.data
			});
		});
}

export function newProduct() {
	const data = {
		product_name: "",
		description: "",
		type: "",
		images: [],
		category_id: "",
		subcat_id: "",
		inStock: false,
		seller: "",
		stars: 0,
		likes: 0,
		total_reviews: 0,
		mrp: 0,
		discounted_price: 0,
		discount: 0,
		values: 0,
		highlights: "",
		specs: "",
		is_verified: false,
		sizes: ["small"]
	};

	return {
		type: GET_PRODUCT,
		payload: data
	};
}
