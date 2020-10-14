import axios from "axios";
import * as actionTypes from "./actionTypes";
import {
  getToken,
  setUserSession,
  removeUserSession,
} from "../../utils/globals";

const dataToken = getToken();

export const registerUser = (data, history) => {
  const request = axios.post(
    `${process.env.REACT_APP_ENDPOINT_MAIN}/users/register`,
    data,
    {
      params: { ok: process.env.REACT_APP_ACCKEY },
    }
  );

  return (dispatch) => {
    dispatch({ type: actionTypes.REGISTER_REQUEST });

    request
      .then((response) => {
        return dispatch(
          {
            type: actionTypes.REGISTER_SUCCESS,
            payload: response.data.data,
          },

          history.push("/login")
        );
      })
      .catch((err) => {
        return dispatch({
          type: actionTypes.REGISTER_FAILURE,
          payload: err.response?.data.status,
        });
      });
  };
};

export const loginWithExternalData = (data, history) => {
  const request = axios.post(
    `${process.env.REACT_APP_ENDPOINT_MAIN}/users/login-external`,
    data,
    {
      params: { ok: process.env.REACT_APP_ACCKEY },
    }
  );

  return (dispatch) => {
    dispatch({ type: actionTypes.FIREBASE_LOGIN_REQUEST });

    request
      .then((response) => {
        return dispatch(
          {
            type: actionTypes.FIREBASE_LOGIN_SUCCESS,
            payload: response.data.data,
          },

          setUserSession(response.data.data.token, response.data.data.user),
          history.push("/dashboard")
        );
      })
      .catch((err) => {
        return dispatch({
          type: actionTypes.FIREBASE_LOGIN_FAILURE,
          payload: err.response?.data.status,
        });
      });
  };
};

export const loginUser = (data, history) => {
  const request = axios.post(
    `${process.env.REACT_APP_ENDPOINT_MAIN}/users/login`,
    data,
    {
      params: { ok: process.env.REACT_APP_ACCKEY },
    }
  );

  return (dispatch) => {
    dispatch({ type: actionTypes.LOGIN_REQUEST });

    request
      .then((response) => {
        return dispatch(
          {
            type: actionTypes.LOGIN_SUCCESS,
            payload: response.data.data,
          },

          setUserSession(response.data.data.token, response.data.data.user),
          history.push("/dashboard")
        );
      })
      .catch((err) => {
        return dispatch({
          type: actionTypes.LOGIN_FAILURE,
          payload: err.response?.data.status,
        });
      });
  };
};

export const logoutUser = (history, token = "") => {
  const request = axios.get(
    `${process.env.REACT_APP_ENDPOINT_MAIN}/users/logout`,
    {
      params: { ok: process.env.REACT_APP_ACCKEY },
      headers: {
        Authorization: dataToken ? dataToken : token,
      },
    }
  );

  return (dispatch) => {
    dispatch({ type: actionTypes.LOGOUT_REQUEST });

    request
      .then((response) => {
        return dispatch(
          {
            type: actionTypes.LOGOUT_SUCCESS,
            payload: response,
          },

          removeUserSession(),
          history.push("/")
          //(window.location.href = "/")
        );
      })
      .catch((err) => {
        return dispatch({
          type: actionTypes.LOGOUT_FAILURE,
          payload: err.response?.data.status,
        });
      });
  };
};

export const getAuth = (token = "") => {
  const request = axios.get(
    `${process.env.REACT_APP_ENDPOINT_MAIN}/users/auth`,
    {
      params: { ok: process.env.REACT_APP_ACCKEY },
      headers: {
        Authorization: dataToken ? dataToken : token,
      },
    }
  );

  return (dispatch) => {
    dispatch({ type: actionTypes.AUTH_REQUEST });

    request
      .then((response) => {
        return dispatch(
          {
            type: actionTypes.AUTH_SUCCESS,
            payload: response.data.data,
          },

          response.data.status.code === 401
            ? removeUserSession()
            : setUserSession(response.data.data.token, response.data.data.user)
        );
      })
      .catch((err) => {
        return dispatch(
          {
            type: actionTypes.AUTH_FAILURE,
            payload: err.response?.data.status,
          },

          removeUserSession()
        );
      });
  };
};

export const updateUser = (id, data, token = "") => {
  const request = axios.put(
    `${process.env.REACT_APP_ENDPOINT_MAIN}/users/${id}`,
    data,
    {
      params: { ok: process.env.REACT_APP_ACCKEY },
      headers: {
        Authorization: dataToken ? dataToken : token,
      },
    }
  );

  return (dispatch) => {
    dispatch({ type: actionTypes.UPDATE_USER_REQUEST });

    request
      .then((response) => {
        dispatch({
          type: actionTypes.UPDATE_USER_SUCCESS,
          payload: response.data.data,
        });
      })
      .catch((err) => {
        return dispatch({
          type: actionTypes.UPDATE_USER_FAILURE,
          payload: err.response?.data.status,
        });
      });
  };
};

export const getUserById = (id, token = "") => {
  const request = axios.get(
    `${process.env.REACT_APP_ENDPOINT_MAIN}/users/${id}`,
    {
      params: { ok: process.env.REACT_APP_ACCKEY },
      headers: {
        Authorization: dataToken ? dataToken : token,
      },
    }
  );

  return (dispatch) => {
    dispatch({ type: actionTypes.GET_USER_REQUEST });

    request
      .then((response) => {
        dispatch({
          type: actionTypes.GET_USER_SUCCESS,
          payload: response.data.data,
        });
      })
      .catch((err) => {
        return dispatch({
          type: actionTypes.GET_USER_FAILURE,
          payload: err.response?.data.status,
        });
      });
  };
};
