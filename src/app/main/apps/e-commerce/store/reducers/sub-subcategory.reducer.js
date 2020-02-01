import * as Actions from "../actions";

const initialState = {
	data: null
};

const subSubcategoryReducer = function(state = initialState, action) {
	switch (action.type) {
		case Actions.GET_SUB_SUBCATEGORY: {
			return {
				...state,
				data: action.payload
			};
		}
		case Actions.SAVE_SUB_SUBCATEGORY: {
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

export default subSubcategoryReducer;
