import { connect } from "react-redux";
import {
  fetchCocktails,
  deleteCocktail
} from "../../actions/cocktailsModuleActions";
import React, { Component } from "react";
import { Alert, Button, LayoutAnimation } from "react-native";
import CocktailsList from "./CocktailsList";

class CocktailsListWrapper extends Component {
  static navigationOptions = {
    headerTitle: "Cocktails List",
    headerRight: (
      <Button
        onPress={() => alert("This is a button!")}
        title="Info"
        color="#0000FF"
      />
    )
  };

  componentDidMount() {
    this.props.fetchCocktails();
  }

  onRefresh = () => {
    this.props.fetchCocktails();
  };

  onPressItem = index => {
    this.props.navigation.navigate("cocktailDetail", {
      cocktailTitle: this.props.cocktails[index].strDrink,
      cocktailId: this.props.cocktails[index].idDrink
    });
  };

  onDeleteItem = cocktailID => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.props.deleteCocktail(cocktailID);
  };

  render() {
    return (
      <CocktailsList
        error={this.props.error}
        data={this.props.cocktails}
        onPressItem={this.onPressItem}
        onDeleteItem={this.onDeleteItem}
        isLoading={this.props.isLoading}
        onRefreshList={this.onRefresh}
      />
    );
  }
}

const mapStateToProps = state => {
  let cocktailsToList = null;
  if (state.cocktailsList.cocktailIds) {
    cocktailsToList = state.cocktailsList.cocktailIds.map(
      id => state.cocktailsList.cocktails[id]
    );
  }

  return {
    cocktails: cocktailsToList,
    isLoading: state.cocktailsList.isFetching,
    error: state.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    deleteCocktail: cocktailID => dispatch(deleteCocktail(cocktailID)),
    fetchCocktails: () => dispatch(fetchCocktails())
  };
};

const CocktailsListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CocktailsListWrapper);

export default CocktailsListContainer;
