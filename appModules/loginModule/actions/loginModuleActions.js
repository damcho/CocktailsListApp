import firebase from "react-native-firebase";

export const REQUEST_LOGIN = "REQUEST_LOGIN";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";

export const REQUEST_SIGN_OUT = "REQUEST_SIGN_OUT";
export const SIGN_OUT_SUCCESS = "SIGN_OUT_SUCCESS";
export const SIGN_OUT_ERROR = "SIGN_OUT_SUCCESS";

function loginRequestInProgress(credentials) {
  console.log("loginRequestInProgress");

  return {
    type: REQUEST_LOGIN,
    credentials: credentials
  };
}

function loginFailed(error) {
  console.log("loginFailed");
  console.log(error);

  return {
    type: LOGIN_FAILURE,
    error: error
  };
}

function loginSuccess(firebaseUser) {
  console.log("loginSuccess");
  return {
    type: LOGIN_SUCCESS,
    credentials: { email: firebaseUser.user.email }
  };
}
function signOutSuccess() {
  console.log("signOutSuccess");

  return {
    type: SIGN_OUT_SUCCESS
  };
}

function signOutError(error) {
  console.log("signOutError");

  return {
    type: SIGN_OUT_ERROR,
    error: error
  };
}

export function requestSignOut() {
  console.log("request sign out");
  return function(dispatch, getState) {
    firebase
      .auth()
      .signOut()
      .then(
        () => dispatch(signOutSuccess()),
        error => dispatch(signOutError(error))
      );
  };
}

export function requestLogin(credentials) {
  return function(dispatch, getState) {
    dispatch(loginRequestInProgress(credentials));

    firebase
      .auth()
      .signInWithEmailAndPassword(credentials.email, credentials.password)
      .then(firebaseUser => dispatch(loginSuccess(firebaseUser)))
      .catch(error => dispatch(loginFailed(error)));
  };
}
