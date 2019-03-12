import React, { Component } from "react";
import { Text, StyleSheet, View } from "react-native";

export default class CocktailDetail extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam("cocktailTitle", "some title")
    };
  };

  componentDidMount() {
    console.log("detail");
    console.log(this.props.navigation.state);
  }

  render() {
    const { navigation } = this.props;

    return (
      <View
        style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
      />
    );
  }
}
