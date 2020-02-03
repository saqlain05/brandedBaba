import axios from "axios";

export const GET_OFFERS = "[E-COMMERCE APP] GET OFFERS";

export const DELETE_OFFER = "[E-COMMERCE APP] DELETE OFFER";
export const SET_OFFERS_SEARCH_TEXT = "[E-COMMERCE APP] SET OFFERS SEARCH TEXT";

export function getOffers() {
	const request = axios.get("http://13.235.187.206/api/offers");
	return (dispatch) =>
		request.then((response) =>
			dispatch({
				type: GET_OFFERS,
				payload: response.data.data
			})
		);
}

export function deleteOffer(offerId) {
	const request = axios.delete(`http://13.235.187.206/api/offers/${offerId}`);
	return (dispatch) =>
		request.then((response) =>
			dispatch({
				type: DELETE_OFFER
			})
		);
}

export function setOffersSearchText(event) {
	return {
		type: SET_OFFERS_SEARCH_TEXT,
		searchText: event.target.value
	};
}
