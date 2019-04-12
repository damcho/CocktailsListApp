import { connect } from "react-redux";
import { fetchCocktails } from "../../actions/cocktailsModuleActions";
import React, { Component } from "react";
import { Alert } from "react-native";
import CocktailsList from "./CocktailsList";
import { urlForCocktails } from "../../apiConnector";

class CocktailsListWrapper extends Component<{}> {
  static navigationOptions = {
    title: "Cocktails List"
  };

  componentDidMount() {
    const query = urlForCocktails();
    this.props.fetchCocktails(query);
  }

  onPressItem = index => {
    this.props.navigation.navigate("cocktailDetail", {
      cocktailTitle: this.props.cocktails[index].strDrink,
      cocktailId: this.props.cocktails[index].idDrink
    });
  };

  render() {
    return (
      <CocktailsList
        data={this.props.cocktails}
        onPressItem={this.onPressItem}
        isLoading={this.props.isLoading}
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
    isLoading: state.cocktailsList.isFetching
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchCocktails: query => dispatch(fetchCocktails(query))
  };
};

const CocktailsListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CocktailsListWrapper);

export default CocktailsListContainer;
