import { connect } from "react-redux";
import { fetchCocktailDetail } from "../../actions/cocktailsModuleActions";
import React, { Component } from "react";
import CocktailDetail from "./CocktailDetail";

class CocktailDetailWrapper extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam("cocktailTitle", "some title")
    };
  };

  componentDidMount() {
    const cocktailID = this.props.navigation.getParam("cocktailId");
    this.props.getCocktailDetail(cocktailID);
  }

  render() {
    return (
      <CocktailDetail
        isLoading={this.props.isLoading}
        cocktailImageUri={this.props.cocktailImageUri}
        ingredients={this.props.ingredients}
        instructions={this.props.instructions}
      />
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getCocktailDetail: cocktailId => dispatch(fetchCocktailDetail(cocktailId))
  };
};

createIngredients = (measures, beverages) => {
  const ingredientsArray = [];
  for (let i = 0; i < measures.length; i++) {
    let preparationIngredient = measures[i] + "of " + beverages[i];
    ingredientsArray.push(preparationIngredient);
  }

  return ingredientsArray;
};

const mapStateToProps = (state, ownProps) => {
  console.log("mapStateToProps");
  const cocktailDetail =
    state.cocktailsRootReducer.cocktailsList.cocktails[
      ownProps.navigation.state.params["cocktailId"]
    ];
  let ingredients = null;
  if (cocktailDetail.measures != null && cocktailDetail.beverages != null) {
    ingredients = createIngredients(
      cocktailDetail.measures,
      cocktailDetail.beverages
    );
  }

  return {
    cocktailImageUri: cocktailDetail.strDrinkThumb,
    ingredients: ingredients,
    instructions: cocktailDetail.strInstructions,
    isLoading: state.cocktailsRootReducer.cocktailsList.isFetching
  };
};

const CocktailDetailContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CocktailDetailWrapper);

export default CocktailDetailContainer;
