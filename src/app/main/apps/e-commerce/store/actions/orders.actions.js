import axios from "axios";

export const GET_ORDERS = "[E-COMMERCE APP] GET ORDERS";
export const SET_ORDERS_SEARCH_TEXT = "[E-COMMERCE APP] SET ORDERS SEARCH TEXT";

export function getOrders() {
	const request = axios.get(`http://13.235.187.206/api/orders`);

	return (dispatch) =>
		request.then((response) =>
			dispatch({
				type: GET_ORDERS,
				payload: response.data.orders
			})
		);
}

export function setOrdersSearchText(event) {
	return {
		type: SET_ORDERS_SEARCH_TEXT,
		searchText: event.target.value
	};
}
