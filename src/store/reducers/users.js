import * as actionTypes from "../actions/actionTypes";

const initialState = {
  isLogin: false,
  user: {},
};

const usrReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_SUCCESS:
    case actionTypes.LOGIN_SUCCESS:
    case actionTypes.FIREBASE_LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload,
        isLogin: true,
      };
    case actionTypes.LOGOUT_SUCCESS:
      return {
        ...state,
        user: initialState.user,
        isLogin: false,
      };
    case actionTypes.UPDATE_USER_SUCCESS:
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};

export default usrReducer;
