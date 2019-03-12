import React, { Component } from "react";
import { FlatList, StyleSheet, View, ActivityIndicator } from "react-native";
import { urlForQueryAndPage, requestCocktails } from "../../apiConnector";
import CocktailsListItem from "./CocktailsListItem";

export default class CocktailsList extends Component<{}> {
  static navigationOptions = {
    title: "Cocktails List"
  };

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      cocktails: []
    };
    this.dataHandler = this.dataHandler.bind(this);
  }
  componentDidMount() {
    this.getCocktails();
  }

  dataHandler(data) {
    console.log(data);
    this.setState({ cocktails: data.drinks, isLoading: false });
  }

  executeQuery = query => {
    this.setState({ isLoading: true });
    requestCocktails(query, this.dataHandler);
  };

  getCocktails() {
    const query = urlForQueryAndPage("place_name", "", 1);
    console.log(query);
    this.executeQuery(query);
  }

  onPressItem = index => {
    console.log("Pressed row: " + index);
    console.log(this.state.cocktails[index].strDrink);
    this.props.navigation.navigate("cocktailDetail", {
      cocktailTitle: this.state.cocktails[index].strDrink
    });
  };

  renderItem = ({ item, index }) => (
    <CocktailsListItem
      item={item}
      index={index}
      onPressItem={this.onPressItem}
    />
  );

  render() {
    const spinner = this.state.isLoading ? (
      <ActivityIndicator size="large" />
    ) : null;

    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.cocktails}
          keyExtractor={(item, index) => item.idDrink}
          renderItem={this.renderItem}
        />
        {spinner}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
