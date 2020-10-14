import * as actionTypes from "../actions/actionTypes";

const initialState = {
  wallets: [],
};

const wltsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_WALLETS_SUCCESS:
      return {
        ...state,
        wallets: action.payload,
      };

    default:
      return state;
  }
};

export default wltsReducer;
