import {
  REQUEST_LOGIN,
  LOGIN_SUCCESS,
  LOGIN_FAILURE
} from "../actions/loginModuleActions";

export default function user(state = {}, action) {
  switch (action.type) {
    case REQUEST_LOGIN:
      return { credentials: null, isLoggingIn: true, loginError: null };
    case LOGIN_SUCCESS:
      return {
        ...state,
        credentials: action.credentials,
        isLoggingIn: false,
        loginError: null
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        credentials: null,
        isLoggingIn: false,
        loginError: action.error.message
      };
    default:
      return state;
  }
}
