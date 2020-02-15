import axios from "axios";
import { showMessage } from "app/store/actions/fuse";

export const GET_ORDER = "[E-COMMERCE APP] GET ORDER";
export const SAVE_ORDER = "[E-COMMERCE APP] SAVE ORDER";

export function getOrder(params) {
	console.log(params);
	const request = axios.get(
		`http://13.235.187.206/api/orders/by-order-id/${params}`
	);

	return (dispatch) =>
		request.then((response) =>
			dispatch({
				type: GET_ORDER,
				payload: response.data.order
			})
		);
}

export function saveOrder(data) {
	const request = axios.post("/api/e-commerce-app/order/save", data);

	return (dispatch) =>
		request.then((response) => {
			dispatch(showMessage({ message: "Order Saved" }));

			return dispatch({
				type: SAVE_ORDER,
				payload: response.data
			});
		});
}
