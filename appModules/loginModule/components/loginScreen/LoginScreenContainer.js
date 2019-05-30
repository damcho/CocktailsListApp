import { connect } from "react-redux";
import React, { Component } from "react";
import LoginScreen from "./LoginScreen/";
import { requestLogin } from "../../actions/loginModuleActions";
import { sha256 } from "react-native-sha256";

class LoginScreenWrapper extends Component {
  componentDidUpdate(prevProps) {
    if (this.props.user != null) {
      this.props.navigation.navigate("cocktailsList");
    }
  }

  hashPassword = credentials => {
    sha256(credentials.password).then(hash => {
      this.props.requestLogin({
        email: credentials.email,
        password: hash
      });
    });
  };

  render() {
    return (
      <LoginScreen
        onLoginButtonPressed={this.hashPassword}
        loginerror={this.props.loggInErrorMessage}
        isLoading={this.props.isLoggingIn}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user.credentials,
    isLoggingIn: state.user.loading,
    loggInErrorMessage: state.user.authError
  };
};

const mapDispatchToProps = dispatch => {
  return {
    requestLogin: credentials => dispatch(requestLogin(credentials))
  };
};

const LoginScreenContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginScreenWrapper);

export default LoginScreenContainer;
