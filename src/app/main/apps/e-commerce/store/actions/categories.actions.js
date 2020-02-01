import axios from "axios";

export const GET_CATEGORIES = "[E-COMMERCE APP] GET CATEGORIES";
export const SET_CATEGORIES_SEARCH_TEXT =
	"[E-COMMERCE APP] SET CATEGORIES SEARCH TEXT";

export function getCategories() {
	const request = axios.get("http://13.235.187.206/api/category");
	return (dispatch) =>
		request.then((response) =>
			dispatch({
				type: GET_CATEGORIES,
				payload: response.data.categories
			})
		);
}

export function setCategorySearchText(event) {
	return {
		type: SET_CATEGORIES_SEARCH_TEXT,
		searchText: event.target.value
	};
}
