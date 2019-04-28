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
    height: 270,
    width: 270
  },
  ingredientsContainer: {
    flex: 1,
    marginTop: 15
  },
  instructionsContainer: {
    flex: 1,
    marginTop: 15
  },
  scrollView: {
    flex: 1
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingLeft: 10,
    paddingRight: 10,
    justifyContent: "space-between",
    backgroundColor: "white"
  }
});
