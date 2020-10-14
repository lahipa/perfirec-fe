import * as actionTypes from "../actions/actionTypes";

const initialState = {
  transactions: [],
};

const trxReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_TRANSACTIONS_SUCCESS:
      const payload = action.payload;

      // this gives an object with dates as keys
      const groups = payload.reduce((groups, transaction) => {
        const date = transaction.date.split("T")[0];
        if (!groups[date]) {
          groups[date] = [];
        }
        groups[date].push(transaction);
        return groups;
      }, {});

      const groupArrays = Object.keys(groups).map((date) => {
        return {
          date,
          lists: groups[date],
        };
      });

      return {
        ...state,
        transactions: groupArrays,
      };

    default:
      return state;
  }
};

export default trxReducer;
