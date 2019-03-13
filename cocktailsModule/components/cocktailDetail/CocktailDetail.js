import React, { Component } from "react";
import { Text, Image, StyleSheet, View } from "react-native";
import { urlForCocktailsDetail, requestCocktails } from "../../apiConnector";

export default class CocktailDetail extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam("cocktailTitle", "some title")
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      cocktail: null
    };
    this.dataHandler = this.dataHandler.bind(this);
  }

  componentDidMount() {
    console.log("detail");
    this.getCocktail();
  }

  dataHandler(data) {
    this.setState({ cocktail: data.drinks[0], isLoading: false });
    console.log(data.drinks[0]);
    console.log(this.state.cocktail.strDrinkThumb);
    //  console.log(this.state.cocktail);
  }

  executeQuery = query => {
    this.setState({ isLoading: true });
    requestCocktails(query, this.dataHandler);
  };

  getCocktail() {
    const cocktailID = this.props.navigation.getParam("cocktailId");
    const query = urlForCocktailsDetail(cocktailID);
    console.log(query);
    this.executeQuery(query);
  }

  render() {
    const cocktailImage = this.state.cocktail ? (
      <Image
        style={{
          flex: 1,
          resizeMode: "contain"
        }}
        source={{ uri: this.state.cocktail.strDrinkThumb }}
      />
    ) : null;

    return (
      <View
        style={{
          flex: 1,
          alignItems: "stretch",
          justifyContent: "center",
          backgroundColor: "#40e0d0"
        }}
      >
        <View
          style={{
            flex: 1,
            marginTop: 15,
            marginRight: 15,
            marginLeft: 15,
            marginBottom: 15,

            backgroundColor: "#ffffff",
            justifyContent: "center"
          }}
        >
          {cocktailImage}
        </View>
      </View>
    );
  }
}
