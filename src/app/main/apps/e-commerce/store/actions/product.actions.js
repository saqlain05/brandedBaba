import axios from "axios";
import { showMessage } from "app/store/actions/fuse";

export const GET_PRODUCT = "[E-COMMERCE APP] GET PRODUCT";
export const SAVE_PRODUCT = "[E-COMMERCE APP] SAVE PRODUCT";

export function getProduct(id) {
	const request = axios.get(`http://13.235.187.206/api/products/${id}`);

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
	let postData;
	if (data.subcat_id !== "") {
		if (data.sub_subcat_id !== "") {
			postData = {
				product_name: data.product_name,
				description: data.description,
				featuredImageId: data.featuredImageId,
				images: data.images,
				category_id: data.category_id,
				sub_subcat_id: data.sub_subcat_id,
				subcat_id: data.subcat_id,
				inStock: data.inStock,
				seller: data.seller,
				stars: data.stars,
				likes: data.likes,
				total_reviews: data.total_reviews,
				mrp: data.mrp,
				discounted_price: data.discounted_price,
				discount: data.discount,
				highlights: data.highlights,
				is_verified: data.is_verified,
				sizes: data.sizes,
				offer_ids: data.offer_ids
			};
		} else {
			postData = {
				product_name: data.product_name,
				description: data.description,
				featuredImageId: data.featuredImageId,
				images: data.images,
				category_id: data.category_id,
				subcat_id: data.subcat_id,
				inStock: data.inStock,
				seller: data.seller,
				stars: data.stars,
				likes: data.likes,
				total_reviews: data.total_reviews,
				mrp: data.mrp,
				discounted_price: data.discounted_price,
				discount: data.discount,
				highlights: data.highlights,
				is_verified: data.is_verified,
				sizes: data.sizes,
				offer_ids: data.offer_ids
			};
		}
	} else {
		postData = {
			product_name: data.product_name,
			description: data.description,
			featuredImageId: data.featuredImageId,
			images: data.images,
			category_id: data.category_id,
			inStock: data.inStock,
			seller: data.seller,
			stars: data.stars,
			likes: data.likes,
			total_reviews: data.total_reviews,
			mrp: data.mrp,
			discounted_price: data.discounted_price,
			discount: data.discount,
			highlights: data.highlights,
			is_verified: data.is_verified,
			sizes: data.sizes,
			offer_ids: data.offer_ids
		};
	}

	const request = axios.post(`http://13.235.187.206/api/products`, postData);

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
	var postData = {
		id: data.id,
		product_name: data.product_name,
		description: data.description,
		featuredImageId: data.featuredImageId,
		images: data.images,
		category_id: data.category_id,
		sub_subcat_id: data.sub_subcat_id,
		subcat_id: data.subcat_id,
		inStock: data.inStock,
		seller: data.seller,
		stars: data.stars,
		likes: data.likes,
		total_reviews: data.total_reviews,
		mrp: data.mrp,
		discounted_price: data.discounted_price,
		discount: data.discount,
		highlights: data.highlights,
		is_verified: data.is_verified,
		sizes: data.sizes,

		offer_ids: data.offer_ids
	};
	const request = axios.put(`http://13.235.187.206/api/products`, postData);

	return (dispatch) =>
		request.then((response) => {
			dispatch(showMessage({ message: "Product Updated" }));

			return dispatch({
				type: SAVE_PRODUCT,
				payload: data
			});
		});
}

export function newProduct() {
	const data = {
		product_name: "",
		description: "",
		featuredImageId: "",
		images: [],
		category_id: "",
		subcat_id: "",
		sub_subcat_id: "",
		inStock: false,
		seller: "",
		stars: 0,
		likes: 0,
		total_reviews: 0,
		mrp: 0,
		discounted_price: 0,
		discount: 0,
		highlights: [],
		is_verified: false,
		sizes: ["small"],
		offer_ids: [],
		category: {
			category_name: ""
		},

		subcategory: {
			subcategory_name: ""
		},

		sub_scategory: {
			sub_subcategory_name: ""
		}
	};

	return {
		type: GET_PRODUCT,
		payload: data
	};
}
