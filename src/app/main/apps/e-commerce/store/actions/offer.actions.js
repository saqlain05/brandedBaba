import axios from "axios";
import { showMessage } from "app/store/actions/fuse";

export const GET_OFFER = "[E-COMMERCE APP] GET OFFER";
export const SAVE_OFFER = "[E-COMMERCE APP] SAVE OFFER";

export function getOffer(id) {
	const request = axios.get(`http://13.235.187.206/api/offers/${id}`);

	return (dispatch) =>
		request.then((response) => {
			return dispatch({
				type: GET_OFFER,
				payload: response.data.data
			});
		});
}

export function saveOffer(data) {
	const request = axios.post(`http://13.235.187.206/api/offers`, {
		offer_description: data.offer_description,
		offer_banner_image: data.offer_banner_image,
		offer_code: data.offer_code,
		max_discount_amount: data.max_discount_amount,
		offer_discount: data.offer_discount,
		minimum_total_amount: data.minimum_total_amount
	});

	return (dispatch) =>
		request.then((response) => {
			dispatch(showMessage({ message: "Offer Saved" }));

			return dispatch({
				type: SAVE_OFFER,
				payload: data
			});
		});
}

export function updateOffer(data) {
	const request = axios.put(`http://13.235.187.206/api/offers/${data.id}`, {
		offer_description: data.offer_description,
		offer_banner_image: data.offer_banner_image,
		offer_code: data.offer_code,
		max_discount_amount: data.max_discount_amount,
		offer_discount: data.offer_discount,
		minimum_total_amount: data.minimum_total_amount
	});

	return (dispatch) =>
		request.then((response) => {
			dispatch(showMessage({ message: "Offer Updated" }));

			return dispatch({
				type: SAVE_OFFER,
				payload: data
			});
		});
}

export function newOffer() {
	const data = {
		offer_description: "",
		offer_banner_image: "",
		offer_code: "",
		max_discount_amount: 0,
		offer_discount: 0,
		minimum_total_amount: 0
	};

	return {
		type: GET_OFFER,
		payload: data
	};
}
