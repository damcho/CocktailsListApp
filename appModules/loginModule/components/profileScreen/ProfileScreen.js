import { View, Text } from "react-native";
import { Button } from "react-native-elements";

import { Alert, ActivityIndicator } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import React, { Component } from "react";
import styles from "./ProfileScreen.styles.js";

const ProfileScreen = (props: Props) => {
  if (props.signOutError) {
    Alert.alert("Error", props.signOutError);
  }
  return (
    <View style={styles.viewContainer}>
      <Text>{props.user}</Text>

      <Icon
        style={styles.Icon}
        name="account-circle"
        backgroundColor="transparent"
        underlayColor="transparent"
        color="black"
        size={150}
      />
      <Button title="Sign Out" block onPress={props.onSignOutButtonTapped} />
      <Button
        title="Dismiss"
        type="clear"
        onPress={props.dismissModal}
        style={styles.dismissButton}
      >
        <Text>Dismiss</Text>
      </Button>
    </View>
  );
};

export default ProfileScreen;
