import axios from "axios";
import { showMessage } from "app/store/actions/fuse";

export const GET_SUB_SUBCATEGORY = "[E-COMMERCE APP] GET SUB_SUBCATEGORY";
export const SAVE_SUB_SUBCATEGORY = "[E-COMMERCE APP] SAVE SUB_SUBCATEGORY";

export function getSubSubcategory(id, subcat_id, sub_subcat_id) {
	const request = axios.get(
		`http://13.235.187.206/api/category/${id}/subcategories/${subcat_id}/subsubcategories/${sub_subcat_id}`
	);
	console.log(request);
	return (dispatch) =>
		request.then((response) => {
			return dispatch({
				type: GET_SUB_SUBCATEGORY,
				payload: response.data.sub_subcategory
			});
		});
}

export function saveSubSubcategory(id, subcat_id, data) {
	const request = axios.post(
		`http://13.235.187.206/api/categories/${id}/subcategories/${subcat_id}/subsubcategories`,
		{
			sub_subcategory_name: data.sub_subcategory_name
		}
	);

	return (dispatch) =>
		request.then((response) => {
			dispatch(showMessage({ message: "SUB SUBCATEGORY Saved" }));

			return dispatch({
				type: SAVE_SUB_SUBCATEGORY,
				payload: data
			});
		});
}

export function updateSubSubcategory(id, subcat_id, data) {
	const request = axios.put(
		`http://13.235.187.206/api/categories/${id}/subcategories/${subcat_id}/subsubcategories/${data.id}`,
		{
			sub_subcategory_name: data.sub_subcategory_name
		}
	);

	return (dispatch) =>
		request.then((response) => {
			dispatch(showMessage({ message: "SUB SUBCATEGORY Updated" }));

			return dispatch({
				type: SAVE_SUB_SUBCATEGORY,
				payload: data
			});
		});
}

export function newSubSubcategory() {
	const data = {
		id: "",
		sub_subcategory_name: ""
	};

	return {
		type: GET_SUB_SUBCATEGORY,
		payload: data
	};
}
