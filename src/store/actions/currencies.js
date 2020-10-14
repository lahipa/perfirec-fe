import axios from "axios";
import * as actionTypes from "./actionTypes";
import { getToken } from "../../utils/globals";

const dataToken = getToken();

export const getCurrency = (token = "") => {
  const request = axios.get(
    `${process.env.REACT_APP_ENDPOINT_MAIN}/currencies`,
    {
      params: { ok: process.env.REACT_APP_ACCKEY },
      headers: {
        Authorization: dataToken ? dataToken : token,
      },
    }
  );

  return (dispatch) => {
    dispatch({ type: actionTypes.GET_CURRENCIES_REQUEST });

    request
      .then((response) => {
        return dispatch({
          type: actionTypes.GET_CURRENCIES_SUCCESS,
          payload: response.data.data,
        });
      })
      .catch((err) => {
        return dispatch({
          type: actionTypes.GET_CURRENCIES_FAILURE,
          payload: err.response.data.status,
        });
      });
  };
};
