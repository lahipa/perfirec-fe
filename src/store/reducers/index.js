import { combineReducers } from "redux";
import { LOGOUT_SUCCESS } from "../actions/actionTypes";

import usrReducer from "./users";
import crcyReducer from "./currencies";
import rcrdReducer from "./records";
import catReducer from "./categories";
import wltsReducer from "./wallets";
import blncReducer from "./balance";
import trxReducer from "./transactions";
import bdgtReducer from "./budgets";
import loading from "./loading";
import error from "./error";

const appReducer = combineReducers({
  /* top-level reducers */
  usrReducer,
  crcyReducer,
  rcrdReducer,
  catReducer,
  wltsReducer,
  blncReducer,
  trxReducer,
  bdgtReducer,
  loading,
  error,
});

const rootReducer = (state, action) => {
  if (action.type === LOGOUT_SUCCESS) {
    state = undefined;
  }

  // Persist
  // if (action.type === SIGNOUT_REQUEST) {
  //   // for all keys defined in your persistConfig(s)
  //   storage.removeItem("persist:root");
  //   // storage.removeItem('persist:otherKey')

  //   state = undefined;
  // }

  return appReducer(state, action);
};

export default rootReducer;
