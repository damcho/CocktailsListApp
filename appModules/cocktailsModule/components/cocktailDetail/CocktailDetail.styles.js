import { StyleSheet } from "react-native";
import { padding, dimensions, backgroundColor } from "../common/styles/base.js";

export default StyleSheet.create({
  spinner: {
    position: "absolute",
    alignSelf: "center"
  },
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: backgroundColor,
    paddingTop: padding.top,
    paddingLeft: padding.left,
    paddingRight: padding.right,
    paddingBottom: padding.bottom
  },
  cocktailImage: {
    width: "100%",
    height: 200,
    resizeMode: "contain"
  },
  ingredientsContainer: {
    marginTop: 15
  },
  instructionsContainer: {
    marginTop: 15
  },
  scrollView: {
    flex: 1
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: "white"
  }
});
