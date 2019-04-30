import { connect } from "react-redux";
import React, { Component } from "react";
import LoginScreen from "./LoginScreen/";
import { requestLogin } from "../../actions/loginModuleActions";

class LoginScreenWrapper extends Component {
  componentDidUpdate(prevProps) {
    if (this.props.user != null) {
      this.props.navigation.navigate("Home");
    }
  }

  render() {
    return (
      <LoginScreen
        onLoginButtonPressed={this.props.requestLogin}
        loginerror={this.props.loggInErrorMessage}
        isLoading={this.props.isLoggingIn}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user.credentials,
    isLoggingIn: state.user.isLoggingIn,
    loggInErrorMessage: state.user.loginError
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
