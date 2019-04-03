import { StyleSheet } from "react-native";

export default StyleSheet.create({
  spinner: {
    position: "absolute",
    alignSelf: "center"
  },
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#40e0d0",
    paddingTop: 15,
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 15
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
    backgroundColor: "#ffffff"
  }
});
