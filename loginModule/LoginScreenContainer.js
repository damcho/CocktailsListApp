import { connect } from "react-redux";
import React, { Component } from "react";
import LoginScreen from "./LoginScreen/";
import firebase from "react-native-firebase";

class LoginScreenWrapper extends Component {
  state = { isLoading: false, errorMessage: null };

  onLoginSuccess = () => {
    this.setState({ isLoading: false, errorMessage: null });
    this.props.navigation.navigate("Home");
    console.log(firebase.auth());
  };

  onLoginError = error => {
    this.setState({ isLoading: false, errorMessage: error.message });
  };
  handleLogin = credentials => {
    const { email, password } = this.state;
    this.setState({ isLoading: true });

    firebase
      .auth()
      .signInWithEmailAndPassword(credentials.email, credentials.password)
      .then(this.onLoginSuccess)
      .catch(this.onLoginError);
  };

  render() {
    return (
      <LoginScreen
        onLoginButtonPressed={this.handleLogin}
        loginerror={this.state.errorMessage}
        isLoading={this.state.isLoading}
      />
    );
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {};
};

const LoginScreenContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginScreenWrapper);

export default LoginScreenContainer;
