import * as actionTypes from "../actions/actionTypes";

const initialState = {
  budgets: [],
  budget: {},
};

const bdgtReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_BUDGETS_SUCCESS:
      return {
        ...state,
        budgets: action.payload,
      };
    case actionTypes.GET_BUDGETS_ID_SUCCESS:
      return {
        ...state,
        budget: action.payload,
      };
    default:
      return state;
  }
};

export default bdgtReducer;
