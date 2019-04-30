import GenerateForm from "react-native-form-builder";
import { View, Text, Button } from "native-base";
import { Alert, ActivityIndicator } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import React, { Component } from "react";
import styles from "./LoginScreen.styles.js";

const LoginScreen = (props: Props) => {
  const fields = [
    {
      type: "email",
      name: "email",
      required: true,
      icon: "ios-mail",
      label: "E-mail",
      defaultValue: "test@testuser.com"
    },
    {
      type: "password",
      name: "password",
      icon: "ios-lock",
      required: true,
      label: "Password",
      defaultValue: "testuser"
    }
  ];

  if (props.loginerror) {
    Alert.alert("Error", props.loginerror);
  }

  onLoginButtonPressed = () => {
    const formValues = this.formGenerator.getValues();
    props.onLoginButtonPressed({
      email: formValues.email,
      password: formValues.password
    });
  };

  const spinner = props.isLoading ? (
    <ActivityIndicator style={styles.spinner} size="large" />
  ) : null;

  return (
    <View style={styles.wrapper}>
      <View>
        <GenerateForm
          ref={c => {
            this.formGenerator = c;
          }}
          fields={fields}
        />
      </View>
      <View style={styles.submitButton}>
        <Button block onPress={this.onLoginButtonPressed}>
          <Text>Login</Text>
        </Button>
      </View>
      {spinner}
    </View>
  );
};

export default LoginScreen;
