import { StyleSheet, Dimensions } from "react-native";

export const padding = {
  left: 15,
  right: 15,
  top: 15,
  bottom: 15
};
export const dimensions = {
  fullHeight: Dimensions.get("window").height,
  fullWidth: Dimensions.get("window").width - padding.left - padding.right
};
