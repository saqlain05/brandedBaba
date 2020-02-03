import * as Actions from "../actions";

const initialState = {
	data: null
};

const offerReducer = function(state = initialState, action) {
	switch (action.type) {
		case Actions.GET_OFFER: {
			return {
				...state,
				data: action.payload
			};
		}
		case Actions.SAVE_OFFER: {
			return {
				...state,
				data: action.payload
			};
		}
		default: {
			return state;
		}
	}
};

export default offerReducer;
