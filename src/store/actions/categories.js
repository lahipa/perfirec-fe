import axios from "axios";
import * as actionTypes from "./actionTypes";
import { getToken } from "../../utils/globals";

const dataToken = getToken();

export const getCategory = (idRecords, token = "") => {
  //id = id from records

  const request = axios.get(
    `${process.env.REACT_APP_ENDPOINT_MAIN}/categories/${idRecords}`,
    {
      params: { ok: process.env.REACT_APP_ACCKEY },
      headers: {
        Authorization: dataToken ? dataToken : token,
      },
    }
  );

  return (dispatch) => {
    dispatch({ type: actionTypes.GET_CATEGORIES_REQUEST });

    request
      .then((response) => {
        return dispatch({
          type: actionTypes.GET_CATEGORIES_SUCCESS,
          payload: response.data.data,
        });
      })
      .catch((err) => {
        return dispatch({
          type: actionTypes.GET_CATEGORIES_FAILURE,
          payload: err.response?.data.status,
        });
      });
  };
};

export const addCategory = (idRecords, data, token = "") => {
  const request = axios.post(
    `${process.env.REACT_APP_ENDPOINT_MAIN}/categories`,
    data,
    {
      params: { ok: process.env.REACT_APP_ACCKEY },
      headers: {
        Authorization: dataToken ? dataToken : token,
      },
    }
  );

  return (dispatch) => {
    dispatch({ type: actionTypes.ADD_CATEGORIES_REQUEST });

    request
      .then((response) => {
        dispatch({
          type: actionTypes.ADD_CATEGORIES_SUCCESS,
          payload: response.data.data,
        });

        return dispatch(getCategory(idRecords, token));
      })
      .catch((err) => {
        return dispatch({
          type: actionTypes.ADD_CATEGORIES_FAILURE,
          payload: err.response?.data.status,
        });
      });
  };
};

export const updateCategory = (id, idRecords, data, token = "") => {
  const request = axios.put(
    `${process.env.REACT_APP_ENDPOINT_MAIN}/categories/${id}`,
    data,
    {
      params: { ok: process.env.REACT_APP_ACCKEY },
      headers: {
        Authorization: dataToken ? dataToken : token,
      },
    }
  );

  return (dispatch) => {
    dispatch({ type: actionTypes.UPDATE_CATEGORIES_REQUEST });

    request
      .then((response) => {
        dispatch({
          type: actionTypes.UPDATE_CATEGORIES_SUCCESS,
          payload: response.data.data,
        });

        return dispatch(getCategory(idRecords, token));
      })
      .catch((err) => {
        return dispatch({
          type: actionTypes.UPDATE_CATEGORIES_FAILURE,
          payload: err.response?.data.status,
        });
      });
  };
};
