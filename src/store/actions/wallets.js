import axios from "axios";
import * as actionTypes from "./actionTypes";
import { getToken } from "../../utils/globals";

const dataToken = getToken();

export const getWallets = (idRecords, token = "") => {
  //id = id from records

  const request = axios.get(
    `${process.env.REACT_APP_ENDPOINT_MAIN}/wallets/${idRecords}`,
    {
      params: { ok: process.env.REACT_APP_ACCKEY },
      headers: {
        Authorization: dataToken ? dataToken : token,
      },
    }
  );

  return (dispatch) => {
    dispatch({ type: actionTypes.GET_WALLETS_REQUEST });

    request
      .then((response) => {
        return dispatch({
          type: actionTypes.GET_WALLETS_SUCCESS,
          payload: response.data.data,
        });
      })
      .catch((err) => {
        return dispatch({
          type: actionTypes.GET_WALLETS_FAILURE,
          payload: err.response.data.status,
        });
      });
  };
};

export const addWallets = (data, idRecords, getBalance, token = "") => {
  const request = axios.post(
    `${process.env.REACT_APP_ENDPOINT_MAIN}/wallets`,
    data,
    {
      params: { ok: process.env.REACT_APP_ACCKEY },
      headers: {
        Authorization: dataToken ? dataToken : token,
      },
    }
  );

  return (dispatch) => {
    dispatch({ type: actionTypes.ADD_WALLETS_REQUEST });

    request
      .then((response) => {
        dispatch({
          type: actionTypes.ADD_WALLETS_SUCCESS,
          payload: response.data.data,
        });

        return dispatch(getWallets(token), getBalance(idRecords, token));
      })
      .catch((err) => {
        return dispatch({
          type: actionTypes.ADD_WALLETS_FAILURE,
          payload: err.response.data.status,
        });
      });
  };
};

export const updateWallets = (id, data, idRecords, getBalance, token = "") => {
  const request = axios.put(
    `${process.env.REACT_APP_ENDPOINT_MAIN}/wallets/${id}`,
    data,
    {
      params: { ok: process.env.REACT_APP_ACCKEY },
      headers: {
        Authorization: dataToken ? dataToken : token,
      },
    }
  );

  return (dispatch) => {
    dispatch({ type: actionTypes.UPDATE_WALLETS_REQUEST });

    request
      .then((response) => {
        dispatch({
          type: actionTypes.UPDATE_WALLETS_SUCCESS,
          payload: response.data.data,
        });

        return dispatch(getWallets(token), getBalance(idRecords, token));
      })
      .catch((err) => {
        return dispatch({
          type: actionTypes.UPDATE_WALLETS_FAILURE,
          payload: err.response.data.status,
        });
      });
  };
};
