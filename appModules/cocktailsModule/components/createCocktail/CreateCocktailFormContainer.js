import { connect } from "react-redux";
import { createCocktail } from "../../actions/cocktailsModuleActions";
import React, { Component } from "react";
import CreateCocktailForm from "./CreateCocktailForm";
import ImagePicker from "react-native-image-picker";

class CreateCocktailFormContainerWrapper extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: "Create Cocktail"
  });
  constructor(props) {
    super(props);

    this.state = {
      id: null,
      cocktailName: null,
      thumbImage: null,
      ingredients: [],
      measures: [],
      instructions: "",
      shouldEnableCreateCocktail: false
    };
  }

  validateCoctail = () => {
    const shouldEnableCreateButton =
      this.state.measures.length &&
      this.state.ingredients.length &&
      this.state.instructions.length &&
      this.state.cocktailName.length
        ? true
        : false;

    this.setState({
      shouldEnableCreateCocktail: shouldEnableCreateButton
    });
  };

  onCocktailIngredientAdded = ingredient => {
    this.setState(
      previousState => ({
        measures: [...previousState.measures, ingredient.measure],
        ingredients: [...previousState.ingredients, ingredient.ingredient]
      }),
      () => {
        this.validateCoctail();
      }
    );
  };

  onDataChanged = values => {
    this.setState(
      previousState => ({
        instructions: values.instructions,
        cocktailName: values.cocktailName
      }),
      () => {
        this.validateCoctail();
      }
    );
  };

  onCreateCocktailPressed = () => {
    const randomId = 100000 + Math.floor(Math.random() * (100000 - 10000));
    const cocktail = {
      idDrink: randomId.toString(),
      strDrink: this.state.cocktailName,
      strDrinkThumb: this.state.thumbImage,
      strInstructions: this.state.instructions,
      beverages: this.state.ingredients,
      measures: this.state.measures
    };

    this.props.createCocktail(cocktail);
    this.props.navigation.goBack();
  };

  onImagePickerPressed = () => {
    const options = {
      title: "Select Cocktail photo",
      storageOptions: {
        skipBackup: true,
        path: "images"
      }
    };

    ImagePicker.showImagePicker(options, response => {
      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else if (response.customButton) {
        console.log("User tapped custom button: ", response.customButton);
      } else {
        const source = { uri: response.uri };

        this.setState({
          thumbImage: response.uri
        });
      }
    });
  };

  render() {
    return (
      <CreateCocktailForm
        onCreateCocktailPressed={this.onCreateCocktailPressed}
        onDataChanged={this.onDataChanged}
        isCreateCocktailEnabled={this.state.shouldEnableCreateCocktail}
        measures={this.state.measures}
        ingredients={this.state.ingredients}
        onCocktailIngredientAdded={this.onCocktailIngredientAdded}
        cocktailImageUri={this.state.thumbImage}
        imagePickerPressed={this.onImagePickerPressed}
      />
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createCocktail: cocktail => dispatch(createCocktail(cocktail))
  };
};

const CreateCocktailFormContainer = connect(
  null,
  mapDispatchToProps
)(CreateCocktailFormContainerWrapper);

export default CreateCocktailFormContainer;
