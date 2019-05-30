import {
  REQUEST_LOGIN,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  REQUEST_SIGN_OUT,
  SIGN_OUT_SUCCESS,
  SIGN_OUT_ERROR
} from "../actions/loginModuleActions";

export default function user(state = {}, action) {
  switch (action.type) {
    case REQUEST_LOGIN:
    case REQUEST_SIGN_OUT:
      return { credentials: null, loading: true, authError: null };
    case LOGIN_SUCCESS:
      return {
        ...state,
        credentials: action.user,
        loading: false,
        authError: null
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        credentials: null,
        loading: false,
        authError: action.error.message
      };
    case SIGN_OUT_SUCCESS:
      return {
        ...state,
        credentials: null,
        loading: false,
        authError: null
      };
    case SIGN_OUT_ERROR:
      return {
        ...state,
        loading: false,
        authError: action.error.message
      };
    default:
      return state;
  }
}
