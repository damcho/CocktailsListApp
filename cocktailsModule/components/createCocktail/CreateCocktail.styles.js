import { StyleSheet } from "react-native";
import { padding, dimensions } from "../common/styles/base.js";

export default StyleSheet.create({
  scrollView: {
    flex: 0.9
  },
  mainContainerView: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: "#40e0d0",
    paddingTop: padding.top,
    paddingLeft: padding.left,
    paddingRight: padding.right,
    paddingBottom: padding.bottom
  },
  imagePickerContainer: {
    backgroundColor: "white",
    flex: 2,
    justifyContent: "center",
    alignItems: "stretch",
    borderColor: "black",
    borderWidth: 1,
    height: 200
  },
  cocktailImage: {
    width: null,
    height: 200,
    resizeMode: "contain"
  },

  formContainer: {
    backgroundColor: "white",
    flex: 1,
    paddingTop: 10
  },
  addIngredientButtonSection: {
    flex: 1,
    width: "100%",
    height: 80,
    justifyContent: "center",
    alignItems: "center"
  },
  addIngredientButton: {
    alignSelf: "center"
  },
  createCocktailButton: {
    flex: 0.1,
    bottom: 0,
    justifyContent: "flex-end"
  },
  selectPhotoText: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 18
  },
  ingredientContainerView: {
    height: 40,
    justifyContent: "center",
    left: 15
  },
  ingredientItem: {
    fontSize: 18,
    fontWeight: "bold"
  }
});
