import * as actionTypes from "../actions/actionTypes";

const initialState = {
  currencies: [],
};

const crcyReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_CURRENCIES_SUCCESS:
      return {
        ...state,
        currencies: action.payload,
      };

    default:
      return state;
  }
};

export default crcyReducer;
