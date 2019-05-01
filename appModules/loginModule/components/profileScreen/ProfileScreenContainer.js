import { connect } from "react-redux";
import React, { Component } from "react";
import ProfileScreen from "./ProfileScreen";
import { requestSignOut } from "../../actions/loginModuleActions";

class ProfileScreenWrapper extends Component {
  componentDidUpdate(prevProps) {
    if (this.props.user.credentials == null) {
      this.props.navigation.navigate("LoginScreenContainer");
    }
  }
  dismissModal = () => {
    this.props.navigation.goBack();
  };
  render() {
    return (
      <ProfileScreen
        signOutError={this.props.error}
        dismissModal={this.dismissModal}
        user={this.props.user}
        onSignOutButtonTapped={this.props.requestSignOut}
        isSigningOut={this.props.isSigningOut}
      />
    );
  }
}

const mapStateToProps = state => {
  const userEmail =
    state.user.credentials == null ? "" : state.user.credentials.email;
  return {
    user: userEmail,
    isSigningOut: state.user.loading,
    error: state.user.authError
  };
};

const mapDispatchToProps = dispatch => {
  return {
    requestSignOut: credentials => dispatch(requestSignOut())
  };
};

const ProfileScreenContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileScreenWrapper);

export default ProfileScreenContainer;
