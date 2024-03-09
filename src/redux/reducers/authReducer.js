import {
  LOAD_PROFILE,
  LOGIN_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOG_OUT,
} from "../actionType";

const initialState = {
  accessToken: sessionStorage.getItem("vidVibe-access-token")
    ? sessionStorage.getItem("vidVibe-access-token")
    : null,
  user: sessionStorage.getItem("vidVibe-user")
    ? JSON.parse(sessionStorage.getItem("vidVibe-user"))
    : null,
  loading: false,
  error: null,
};

export const authReducer = (prevState = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case LOGIN_REQUEST:
      return {
        ...prevState,
        loading: true,
        error: null,
      };

    case LOGIN_SUCCESS:
      return {
        ...prevState,
        accessToken: payload,
        loading: false,
        error: null,
      };

    case LOGIN_FAIL: {
      return {
        ...prevState,
        accessToken: null,
        loading: false,
        error: payload,
      };
    }

    case LOAD_PROFILE: {
      return {
        ...prevState,
        user: payload,
      };
    }

    case LOG_OUT:
      return {
        ...prevState,
        accessToken: null,
        user: null,
      };
    default:
      return prevState;
  }
};
