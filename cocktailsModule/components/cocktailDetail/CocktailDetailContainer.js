import { connect } from "react-redux";
import { fetchCocktailDetail } from "../../actions/cocktailsModuleActions";
import React, { Component } from "react";
import CocktailDetail from "./CocktailDetail";

class CocktailDetailContainer extends Component {
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

createIngredients = data => {
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
};

const mapStateToProps = (state, ownProps) => {
  const cocktailDetail =
    state.cocktailsList.cocktails[
      ownProps.navigation.state.params["cocktailId"]
    ];
  const ingredients = createIngredients(cocktailDetail);
  return {
    cocktailImageUri: cocktailDetail.strDrinkThumb,
    ingredients: ingredients,
    instructions: cocktailDetail.strInstructions,
    isLoading: state.cocktailsList.isFetching
  };
};

const CocktailWrapper = connect(
  mapStateToProps,
  mapDispatchToProps
)(CocktailDetailContainer);

export default CocktailWrapper;
