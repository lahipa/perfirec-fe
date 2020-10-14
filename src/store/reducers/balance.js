import * as actionTypes from "../actions/actionTypes";

const initialState = {
  balance: [],
};

//dataBalance.reduce((prev, val) => prev + val.balance, 0)
const blncReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_BALANCE_SUCCESS:
      return {
        ...state,
        balance: action.payload,
      };
    default:
      return state;
  }
};

export default blncReducer;
