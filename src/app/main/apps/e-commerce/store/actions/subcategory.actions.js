import axios from "axios";
import { showMessage } from "app/store/actions/fuse";

export const GET_SUBCATEGORY = "[E-COMMERCE APP] GET SUBCATEGORY";
export const SAVE_SUBCATEGORY = "[E-COMMERCE APP] SAVE SUBCATEGORY";

export function getSubcategory(id, subcat_id) {
	const request = axios.get(
		`http://13.235.187.206/api/category/${id}/subcategories/${subcat_id}`
	);

	return (dispatch) =>
		request.then((response) => {
			return dispatch({
				type: GET_SUBCATEGORY,
				payload: response.data.subcategory
			});
		});
}

export function saveSubcategory(id, data) {
	const request = axios.post(
		`http://13.235.187.206/api/categories/${id}/subcategories`,
		{
			subcategory_name: data.subcategory_name
		}
	);

	return (dispatch) =>
		request.then((response) => {
			dispatch(showMessage({ message: "SUBCATEGORY Saved" }));

			return dispatch({
				type: SAVE_SUBCATEGORY,
				payload: data
			});
		});
}

export function updateSubcategory(id, data) {
	const request = axios.put(
		`http://13.235.187.206/api/categories/${id}/subcategories/${data.id}`,
		{
			subcategory_name: data.subcategory_name
		}
	);

	return (dispatch) =>
		request.then((response) => {
			dispatch(showMessage({ message: "SUBCATEGORY Updated" }));

			return dispatch({
				type: SAVE_SUBCATEGORY,
				payload: data
			});
		});
}

export function newSubcategory() {
	const data = {
		id: "",
		subcategory_name: "",
		sub_subcategories: []
	};

	return {
		type: GET_SUBCATEGORY,
		payload: data
	};
}
