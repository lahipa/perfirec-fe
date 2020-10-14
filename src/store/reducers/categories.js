import * as actionTypes from "../actions/actionTypes";

const initialState = {
  categories: [],
};

const catReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_CATEGORIES_SUCCESS:
      return {
        ...state,
        categories: action.payload,
      };

    default:
      return state;
  }
};

export default catReducer;
