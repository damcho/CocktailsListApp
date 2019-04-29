import firebase from "react-native-firebase";

export const REQUEST_LOGIN = "REQUEST_LOGIN";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";

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
