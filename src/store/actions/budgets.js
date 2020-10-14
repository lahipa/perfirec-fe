import axios from "axios";
import * as actionTypes from "./actionTypes";
import { getToken } from "../../utils/globals";

const dataToken = getToken();

export const getBudgets = (idRecords, token = "") => {
  // id = id dari records...

  const request = axios.get(
    `${process.env.REACT_APP_ENDPOINT_MAIN}/budgets/${idRecords}/sync`,
    {
      params: { ok: process.env.REACT_APP_ACCKEY },
      headers: {
        Authorization: dataToken ? dataToken : token,
      },
    }
  );

  return (dispatch) => {
    dispatch({ type: actionTypes.GET_BUDGETS_REQUEST });

    request
      .then((response) => {
        return dispatch({
          type: actionTypes.GET_BUDGETS_SUCCESS,
          payload: response.data.data,
        });
      })
      .catch((err) => {
        console.log(err.response);
        return dispatch({
          type: actionTypes.GET_BUDGETS_FAILURE,
          payload: err.response?.data.status,
        });
      });
  };
};

export const addBudgets = (idRecords, data, token = "") => {
  const request = axios.post(
    `${process.env.REACT_APP_ENDPOINT_MAIN}/budgets`,
    data,
    {
      params: { ok: process.env.REACT_APP_ACCKEY },
      headers: {
        Authorization: dataToken ? dataToken : token,
      },
    }
  );

  return (dispatch) => {
    dispatch({ type: actionTypes.ADD_BUDGETS_REQUEST });

    request
      .then((response) => {
        dispatch({
          type: actionTypes.ADD_BUDGETS_SUCCESS,
          payload: response.data.data,
        });

        return dispatch(getBudgets(idRecords, token));
      })
      .catch((err) => {
        console.log(err.response);
        return dispatch({
          type: actionTypes.ADD_BUDGETS_FAILURE,
          payload: err.response?.data.status,
        });
      });
  };
};

export const updateBudgets = (id, idRecords, data, token = "") => {
  const request = axios.put(
    `${process.env.REACT_APP_ENDPOINT_MAIN}/budgets/${id}`,
    data,
    {
      params: { ok: process.env.REACT_APP_ACCKEY },
      headers: {
        Authorization: dataToken ? dataToken : token,
      },
    }
  );

  return (dispatch) => {
    dispatch({ type: actionTypes.UPDATE_BUDGETS_REQUEST });

    request
      .then((response) => {
        dispatch({
          type: actionTypes.UPDATE_BUDGETS_SUCCESS,
          payload: response.data.data,
        });

        return dispatch(getBudgets(idRecords, token));
      })
      .catch((err) => {
        console.log(err.response);
        return dispatch({
          type: actionTypes.UPDATE_BUDGETS_FAILURE,
          payload: err.response?.data.status,
        });
      });
  };
};

export const getBudgetsById = (id, token = "") => {
  const request = axios.get(
    `${process.env.REACT_APP_ENDPOINT_MAIN}/budgets/${id}`,
    {
      params: { ok: process.env.REACT_APP_ACCKEY },
      headers: {
        Authorization: dataToken ? dataToken : token,
      },
    }
  );

  return (dispatch) => {
    dispatch({ type: actionTypes.GET_BUDGETS_ID_REQUEST });

    request
      .then((response) => {
        return dispatch({
          type: actionTypes.GET_BUDGETS_ID_SUCCESS,
          payload: response.data.data,
        });
      })
      .catch((err) => {
        return dispatch({
          type: actionTypes.GET_BUDGETS_ID_FAILURE,
          payload: err.response?.data.status,
        });
      });
  };
};
