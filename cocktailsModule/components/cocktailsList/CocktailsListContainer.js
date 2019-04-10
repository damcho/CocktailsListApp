import { connect } from "react-redux";
import { fetchCocktails } from "../../actions/cocktailsModuleActions";
import React, { Component } from "react";
import { Alert } from "react-native";
import CocktailsList from "./CocktailsList";

class CocktailsListWrapper extends Component<{}> {
  static navigationOptions = {
    title: "Cocktails List"
  };

  componentDidMount() {
    this.props.fetchCocktails();
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
  return {
    cocktails: state.cocktailsList.cocktails,
    isLoading: state.cocktailsList.isFetching
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchCocktails: () => dispatch(fetchCocktails())
  };
};

const CocktailsListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CocktailsListWrapper);

export default CocktailsListContainer;
