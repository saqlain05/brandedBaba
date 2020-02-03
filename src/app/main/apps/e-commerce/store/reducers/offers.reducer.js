import * as Actions from "../actions";

const initialState = {
	data: [],
	searchText: ""
};

const offersReducer = function(state = initialState, action) {
	switch (action.type) {
		case Actions.GET_OFFERS: {
			return {
				...state,
				data: action.payload
			};
		}
		case Actions.SET_OFFERS_SEARCH_TEXT: {
			return {
				...state,
				searchText: action.searchText
			};
		}

		case Actions.DELETE_OFFER: {
			return {
				...state
			};
		}

		default: {
			return state;
		}
	}
};

export default offersReducer;
