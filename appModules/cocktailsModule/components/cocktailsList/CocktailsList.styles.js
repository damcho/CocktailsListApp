import { StyleSheet } from "react-native";
import { padding, dimensions, backgroundColor } from "../common/styles/base.js";

export default StyleSheet.create({
  mainContainerView: {
    flex: 1,
    backgroundColor: backgroundColor
  },
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
  }
});
