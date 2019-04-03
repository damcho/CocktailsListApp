import React, { Component } from "react";
import { Alert } from "react-native";
import { urlForCocktails, requestCocktails } from "../../apiConnector";
import CocktailsList from "./CocktailsList";

export default class CocktailsListContainer extends Component<{}> {
  static navigationOptions = {
    title: "Cocktails List"
  };

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      cocktails: []
    };
  }
  componentDidMount() {
    this.getCocktails();
  }

  dataHandler = data => {
    if (data._hasError) {
      Alert.alert("Error", data._response);
      this.setState({ cocktails: null, isLoading: false });
    } else {
      this.setState({ cocktails: data.drinks, isLoading: false });
    }
  };

  executeQuery = query => {
    this.setState({ isLoading: true });
    requestCocktails(query, this.dataHandler);
  };

  getCocktails() {
    const query = urlForCocktails();
    this.executeQuery(query);
  }

  onPressItem = index => {
    this.props.navigation.navigate("cocktailDetail", {
      cocktailTitle: this.state.cocktails[index].strDrink,
      cocktailId: this.state.cocktails[index].idDrink
    });
  };

  render() {
    return (
      <CocktailsList
        data={this.state.cocktails}
        onPressItem={this.onPressItem}
        isLoading={this.state.isLoading}
      />
    );
  }
}
