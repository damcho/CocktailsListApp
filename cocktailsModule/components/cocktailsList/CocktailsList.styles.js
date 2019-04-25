import { StyleSheet } from "react-native";
import { padding, dimensions } from "../common/styles/base.js";

export default StyleSheet.create({
  spinner: {
    position: "absolute",
    alignSelf: "center"
  },
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#40e0d0",
    paddingTop: padding.top,
    paddingLeft: padding.left,
    paddingRight: padding.right,
    paddingBottom: padding.bottom
  },
  flatlist: {}
});
