import { connect } from "react-redux";
import { fetchCocktails } from "../../actions/cocktailsModuleActions";
import React, { Component } from "react";
import CreateCocktailForm from "./CreateCocktailForm";
import ImagePicker from "react-native-image-picker";

class CreateCocktailFormContainerWrapper extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: null,
      thumbImage: null,
      ingredients: [],
      measures: [],
      instructions: "",
      shouldEnableCreateCocktail: true
    };
  }

  componentDidMount() {}

  validateCoctail = () => {
    const shouldEnableCreateButton =
      this.state.measures.length &&
      this.state.ingredients.length &&
      this.state.instructions.length
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

  onInstructionsAdded = instructions => {
    this.setState(
      previousState => ({
        instructions: instructions
      }),
      () => {
        this.validateCoctail();
      }
    );
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

        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };

        this.setState({
          thumbImage: response.uri
        });
      }
    });
  };

  render() {
    return (
      <CreateCocktailForm
        onInstructionsAdded={this.onInstructionsAdded}
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

const mapStateToProps = state => {
  return {
    cockName: "nombre"
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchCocktails: () => dispatch(fetchCocktails())
  };
};

const CreateCocktailFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateCocktailFormContainerWrapper);

export default CreateCocktailFormContainer;
