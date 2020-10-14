import * as actionTypes from "../actions/actionTypes";

const initialState = {
  records: [],
  record: {},
};

const rcrdReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_RECORD_SUCCESS:
      return {
        ...state,
        records: action.payload,
      };
    case actionTypes.GET_RECORD_ID_SUCCESS:
      return {
        ...state,
        record: action.payload,
      };
    default:
      return state;
  }
};

export default rcrdReducer;
