import { connect } from "react-redux";
import React, { Component } from "react";
import CocktailDetail from "./CocktailDetail";
import { urlForCocktailsDetail, requestCocktails } from "../../apiConnector";

export default class CocktailDetailContainer extends Component {
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
    return (
      <CocktailDetail
        isLoading={this.state.isLoading}
        cocktailImageUri={this.state.cocktailImageUri}
        ingredients={this.state.ingredients}
        instructions={this.state.instructions}
      />
    );
  }
}
