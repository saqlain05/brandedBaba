import axios from "axios";
import { showMessage } from "app/store/actions/fuse";

export const GET_CATEGORY = "[E-COMMERCE APP] GET CATEGORY";
export const SAVE_CATEGORY = "[E-COMMERCE APP] SAVE CATEGORY";

export function getCategory(id) {
	console.log(id);
	const request = axios.get(`http://13.235.187.206/api/category/${id}`);
	console.log(request);
	return (dispatch) =>
		request.then((response) => {
			return dispatch({
				type: GET_CATEGORY,
				payload: response.data.category
			});
		});
}

export function saveCategory(data) {
	const request = axios.post(`http://13.235.187.206/api/categories`, {
		category_name: data.category_name
	});

	return (dispatch) =>
		request.then((response) => {
			dispatch(showMessage({ message: "CATEGORY Saved" }));

			return dispatch({
				type: SAVE_CATEGORY,
				payload: data
			});
		});
}

export function updateCategory(data) {
	const request = axios.put(`http://13.235.187.206/api/categories/${data.id}`, {
		category_name: data.category_name
	});

	return (dispatch) =>
		request.then((response) => {
			dispatch(showMessage({ message: "CATEGORY Updated" }));

			return dispatch({
				type: SAVE_CATEGORY,
				payload: data
			});
		});
}

export function newCategory() {
	const data = {
		id: "",
		category_name: "",
		sub_categories: []
	};

	return {
		type: GET_CATEGORY,
		payload: data
	};
}
