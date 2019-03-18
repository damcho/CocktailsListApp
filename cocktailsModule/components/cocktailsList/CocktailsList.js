import React, { Component } from "react";
import { FlatList, StyleSheet, View, ActivityIndicator } from "react-native";
import { urlForCocktails, requestCocktails } from "../../apiConnector";
import CocktailsListItem from "./CocktailsListItem";
import AsyncImage from "../common/AsyncImage";

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
    const query = urlForCocktails("place_name", "", 1);
    console.log(query);
    this.executeQuery(query);
  }

  onPressItem = index => {
    console.log("Pressed row: " + index);
    this.props.navigation.navigate("cocktailDetail", {
      cocktailTitle: this.state.cocktails[index].strDrink,
      cocktailId: this.state.cocktails[index].idDrink
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
      <ActivityIndicator size="large" style={styles.spinner} />
    ) : null;

    return (
      <View style={styles.container}>
        <FlatList
          style={styles.flatlist}
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
  flatlist: {}
});
