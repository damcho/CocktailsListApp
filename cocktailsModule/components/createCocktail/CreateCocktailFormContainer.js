import { connect } from "react-redux";
import { fetchCocktails } from "../../actions/cocktailsModuleActions";
import React, { Component } from "react";
import CreateCocktailForm from "./CreateCocktailForm";
import ImagePicker from "react-native-image-picker";

class CreateCocktailFormContainerWrapper extends Component {
  constructor(props) {
    super(props);

    this.state = {
      avatarSource: null
    };
  }
  componentDidMount() {}

  onImagePickerPressed = () => {
    const options = {
      title: "Select Cocktail image",
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
          avatarSource: response.uri
        });
      }
    });
  };

  render() {
    console.log("imprimoooo");
    const imageUri = this.state.avatarSource ? this.state.avatarSource : null;
    return (
      <CreateCocktailForm
        cocktailImageUri={this.state.avatarSource}
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
