import React, { Component } from "react";
import {
  Text,
  Image,
  StyleSheet,
  View,
  ActivityIndicator,
  ScrollView,
  Alert
} from "react-native";
import { urlForCocktailsDetail, requestCocktails } from "../../apiConnector";
import AsyncImage from "../common/AsyncImage";
import styles from "./CocktailDetail.styles.js";

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
    if (data._hasError) {
      Alert.alert("Error", data._response);
      this.setState({
        isLoading: false
      });
    } else {
      const cocktail = data.drinks[0];
      const ingredients = this.createIngredients(cocktail);
      this.setState({
        ingredients: ingredients,
        instructions: cocktail.strInstructions,
        isLoading: false,
        cocktailImageUri: cocktail.strDrinkThumb
      });
    }
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
