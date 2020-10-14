import axios from "axios";
import * as actionTypes from "./actionTypes";
import { getToken } from "../../utils/globals";

const dataToken = getToken();

export const getTransactions = (idRecords, params, token = "") => {
  //id = id from records

  const request = axios.get(
    `${process.env.REACT_APP_ENDPOINT_MAIN}/transactions/${idRecords}`,
    {
      params: { ok: process.env.REACT_APP_ACCKEY, ...params },
      headers: {
        Authorization: dataToken ? dataToken : token,
      },
    }
  );

  return (dispatch) => {
    dispatch({ type: actionTypes.GET_TRANSACTIONS_REQUEST });

    request
      .then((response) => {
        return dispatch({
          type: actionTypes.GET_TRANSACTIONS_SUCCESS,
          payload: response.data.data,
        });
      })
      .catch((err) => {
        return dispatch({
          type: actionTypes.GET_TRANSACTIONS_FAILURE,
          payload: err.response.data.status,
        });
      });
  };
};

export const addTransactions = (
  idRecords,
  data,
  params,
  getBalance,
  token = ""
) => {
  //id = id from records

  const request = axios.post(
    `${process.env.REACT_APP_ENDPOINT_MAIN}/transactions`,
    data,
    {
      params: { ok: process.env.REACT_APP_ACCKEY },
      headers: {
        Authorization: dataToken ? dataToken : token,
      },
    }
  );

  return (dispatch) => {
    dispatch({ type: actionTypes.ADD_TRANSACTIONS_REQUEST });

    request
      .then((response) => {
        dispatch({
          type: actionTypes.ADD_TRANSACTIONS_SUCCESS,
          payload: response.data.data,
        });

        return dispatch(
          getTransactions(idRecords, params, token),
          getBalance(idRecords, token)
        );
      })
      .catch((err) => {
        return dispatch({
          type: actionTypes.ADD_TRANSACTIONS_FAILURE,
          payload: err.response.data.status,
        });
      });
  };
};
