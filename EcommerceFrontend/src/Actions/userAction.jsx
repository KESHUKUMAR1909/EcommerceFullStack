import {
  LOGIN_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  CLEAR_ERRORS,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAIL, LOAD_USER_FAIL,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOGOUT_FAIL , LOGOUT_SUCCESS
} from "../Constants/userConstant.jsx";
import axios from 'axios';

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const {data}  = await axios.post(
      '/api/v1/login',
      { email, password },
      config
    );
    // console.log(data.user);

    dispatch({ type: LOGIN_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({
      type: LOGIN_FAIL,
      payload: error.response?.data?.message || "Login failed",
    });
  }
};



export const register = (userData) => async (dispatch) => {
  try {
    dispatch({ type: REGISTER_USER_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true, // Important if you're using cookies
    };

    const { data } = await axios.post('/api/v1/register', userData, config);

    dispatch({
      type: REGISTER_USER_SUCCESS,
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: REGISTER_USER_FAIL,
      payload: error.response?.data?.message || "Registration failed",
    });
  }
};

// Load User

export const loadUser = () => async (dispatch) => {
try {
  dispatch({ type: LOAD_USER_REQUEST });

  // const config = {
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  // };

  const {data}  = await axios.get(
    '/api/v1/me',
  );
  // console.log(data.user);

  dispatch({ type: LOAD_USER_SUCCESS, payload: data.user });
} catch (error) {
  dispatch({
    type: LOAD_USER_FAIL,
    payload: error.response?.data?.message || "Login failed",
  });
}
};



export const logout = () => async (dispatch) => {
try {
  await axios.get('/api/v1/logout');
  dispatch({ type: LOGOUT_SUCCESS });
} catch (error) {
  dispatch({
    type: LOGOUT_FAIL,
    payload: error.response?.data?.message || error.message,
  });
}
};


// ✅ Clear Errors
export const clearErrors = () => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
