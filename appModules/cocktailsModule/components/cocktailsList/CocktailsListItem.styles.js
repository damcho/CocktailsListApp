import { StyleSheet } from "react-native";

export default StyleSheet.create({
  thumb: {
    width: 80,
    height: 80,
    marginRight: 10
  },
  textContainer: {
    flex: 1
  },
  separator: {
    height: 1,
    backgroundColor: "#dddddd"
  },
  cocktailName: {
    fontSize: 20,
    color: "#656565"
  },
  rowContainer: {
    flexDirection: "row",
    padding: 10,
    backgroundColor: "#ffffff",
    marginBottom: 10
  },
  deleteCellButton: {
    flex: 1,
    backgroundColor: "red",
    marginBottom: 10,
    justifyContent: "center"
  },
  deleteCellButtonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white"
  }
});
