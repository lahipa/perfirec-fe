import axios from "axios";
import * as actionTypes from "./actionTypes";
import { getToken } from "../../utils/globals";

const dataToken = getToken();

export const getRecord = (idUser, token = "") => {
  const request = axios.get(
    `${process.env.REACT_APP_ENDPOINT_MAIN}/records/${idUser}/sync`,
    {
      params: { ok: process.env.REACT_APP_ACCKEY },
      headers: {
        Authorization: dataToken ? dataToken : token,
      },
    }
  );

  return (dispatch) => {
    dispatch({ type: actionTypes.GET_RECORD_REQUEST });

    request
      .then((response) => {
        return dispatch({
          type: actionTypes.GET_RECORD_SUCCESS,
          payload: response.data.data,
        });
      })
      .catch((err) => {
        return dispatch({
          type: actionTypes.GET_RECORD_FAILURE,
          payload: err.response?.data.status,
        });
      });
  };
};

export const addRecord = (idUser, data, token = "") => {
  const request = axios.post(
    `${process.env.REACT_APP_ENDPOINT_MAIN}/records`,
    data,
    {
      params: { ok: process.env.REACT_APP_ACCKEY },
      headers: {
        Authorization: dataToken ? dataToken : token,
      },
    }
  );

  return (dispatch) => {
    dispatch({ type: actionTypes.ADD_RECORD_REQUEST });

    request
      .then((response) => {
        dispatch({
          type: actionTypes.ADD_RECORD_SUCCESS,
          payload: response.data.data,
        });

        return dispatch(getRecord(idUser, token));
      })
      .catch((err) => {
        return dispatch({
          type: actionTypes.ADD_RECORD_FAILURE,
          payload: err.response?.data.status,
        });
      });
  };
};

export const getRecordById = (id, token = "") => {
  // id = id dari records
  const request = axios.get(
    `${process.env.REACT_APP_ENDPOINT_MAIN}/records/${id}`,
    {
      params: { ok: process.env.REACT_APP_ACCKEY },
      headers: {
        Authorization: dataToken ? dataToken : token,
      },
    }
  );

  return (dispatch) => {
    dispatch({ type: actionTypes.GET_RECORD_ID_REQUEST });

    request
      .then((response) => {
        return dispatch({
          type: actionTypes.GET_RECORD_ID_SUCCESS,
          payload: response.data.data,
        });
      })
      .catch((err) => {
        return dispatch({
          type: actionTypes.GET_RECORD_ID_FAILURE,
          payload: err.response?.data.status,
        });
      });
  };
};

export const updateRecordMember = (id, data, token = "") => {
  // id = id dari records
  const request = axios.put(
    `${process.env.REACT_APP_ENDPOINT_MAIN}/records/${id}/add-member`,
    data,
    {
      params: { ok: process.env.REACT_APP_ACCKEY },
      headers: {
        Authorization: dataToken ? dataToken : token,
      },
    }
  );

  return (dispatch) => {
    dispatch({ type: actionTypes.UPDATE_RECORD_MEMBER_REQUEST });

    request
      .then((response) => {
        dispatch({
          type: actionTypes.UPDATE_RECORD_MEMBER_SUCCESS,
          payload: response.data.data,
        });

        return dispatch(getRecordById(id, token));
      })
      .catch((err) => {
        console.log(err.response);
        return dispatch({
          type: actionTypes.UPDATE_RECORD_MEMBER_FAILURE,
          payload: err.response?.data.status,
        });
      });
  };
};
