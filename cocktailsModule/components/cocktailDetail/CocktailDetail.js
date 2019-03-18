import React, { Component } from "react";
import {
  Text,
  Image,
  StyleSheet,
  View,
  ActivityIndicator,
  ScrollView
} from "react-native";
import { urlForCocktailsDetail, requestCocktails } from "../../apiConnector";
import AsyncImage from "../common/AsyncImage";

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
      cocktailImageUri: null,
      ingredients: null,
      instructions: null
    };
    this.dataHandler = this.dataHandler.bind(this);
  }

  componentDidMount() {
    this.getCocktail();
  }

  dataHandler(data) {
    const ingredients = this.createIngredients(data.drinks[0]);
    this.setState({
      ingredients: ingredients,
      instructions: data.drinks[0].strInstructions,
      isLoading: false,
      cocktailImageUri: data.drinks[0].strDrinkThumb
    });
  }

  createIngredients(data) {
    const ingredientsArray = [];
    for (let i = 0; i < 5; i++) {
      let ingredientkey = "strIngredient" + i;
      let amountkey = "strMeasure" + i;
      if (data[amountkey] != null && data[amountkey] != "") {
        let preparationIngredient = data[amountkey] + data[ingredientkey];
        ingredientsArray.push(preparationIngredient);
      }
    }
    return ingredientsArray;
  }

  executeQuery = query => {
    this.setState({ isLoading: true });
    requestCocktails(query, this.dataHandler);
  };

  getCocktail() {
    const cocktailID = this.props.navigation.getParam("cocktailId");
    const query = urlForCocktailsDetail(cocktailID);
    this.executeQuery(query);
  }

  render() {
    const spinner = this.state.isLoading ? (
      <ActivityIndicator size="large" style={styles.spinner} />
    ) : null;

    const cocktailImage = this.state.cocktailImageUri ? (
      <AsyncImage
        style={styles.cocktailImage}
        source={{
          uri: this.state.cocktailImageUri
        }}
        placeholderColor="#b3e5fc"
      />
    ) : null;

    const ingredientsTitle =
      this.state.ingredients != null ? <Text>Ingredients:</Text> : null;
    const ingredientsList =
      this.state.ingredients != null
        ? this.state.ingredients.map(ingredient => {
            return <Text>{ingredient}</Text>;
          })
        : null;
    const instructionsTitle =
      this.state.instructions != null ? <Text>Instructions:</Text> : null;
    const instructions =
      this.state.instructions != null ? (
        <Text>{this.state.instructions}</Text>
      ) : null;

    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollViewContent}
        >
          {cocktailImage}
          <View style={styles.ingredientsContainer}>
            {ingredientsTitle}
            {ingredientsList}
          </View>
          <View style={styles.instructionsContainer}>
            {instructionsTitle}
            {instructions}
          </View>
        </ScrollView>
        {spinner}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  spinner: {
    position: "absolute",
    alignSelf: "center"
  },
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#40e0d0",
    paddingTop: 15,
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 15
  },
  cocktailImage: {
    height: 270,
    width: 270
  },
  ingredientsContainer: {
    flex: 1,
    marginTop: 15
  },
  instructionsContainer: {
    flex: 1,
    marginTop: 15
  },
  scrollView: {
    flex: 1
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingLeft: 10,
    paddingRight: 10,
    justifyContent: "space-between",
    backgroundColor: "#ffffff"
  }
});
