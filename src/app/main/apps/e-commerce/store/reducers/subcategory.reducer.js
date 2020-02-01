import * as Actions from "../actions";

const initialState = {
	data: null
};

const subcategoryReducer = function(state = initialState, action) {
	switch (action.type) {
		case Actions.GET_SUBCATEGORY: {
			return {
				...state,
				data: action.payload
			};
		}
		case Actions.SAVE_SUBCATEGORY: {
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

export default subcategoryReducer;
