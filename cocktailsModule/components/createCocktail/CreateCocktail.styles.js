import { StyleSheet } from "react-native";

export default StyleSheet.create({
  mainContainerView: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: "#40e0d0",
    paddingTop: 15,
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 15
  },
  imagePickerContainer: {
    backgroundColor: "white",
    flex: 0.5,
    justifyContent: "center",
    alignItems: "stretch",
    borderColor: "black",
    borderWidth: 1
  },
  cocktailImage: {
    width: null,
    height: 200,
    resizeMode: "contain"
  },

  formContainer: {
    backgroundColor: "white",
    flex: 0.1
  },
  addIngredientButton: { flex: 0.1 },
  createCocktailButton: {
    flex: 0.2
  },
  selectPhotoText: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 18
  }
});
