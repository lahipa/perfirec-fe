import axios from "axios";
import * as actionTypes from "./actionTypes";
import { getToken } from "../../utils/globals";

const dataToken = getToken();

export const getBalance = (idRecords, token = "") => {
  // id = id dari records...

  const request = axios.get(
    `${process.env.REACT_APP_ENDPOINT_MAIN}/balance/${idRecords}`,
    {
      params: { ok: process.env.REACT_APP_ACCKEY },
      headers: {
        Authorization: dataToken ? dataToken : token,
      },
    }
  );

  return (dispatch) => {
    dispatch({ type: actionTypes.GET_BALANCE_REQUEST });

    request
      .then((response) => {
        return dispatch({
          type: actionTypes.GET_BALANCE_SUCCESS,
          payload: response.data.data,
        });
      })
      .catch((err) => {
        console.log(err.response);
        return dispatch({
          type: actionTypes.GET_BALANCE_FAILURE,
          payload: err.response?.data.status,
        });
      });
  };
};
