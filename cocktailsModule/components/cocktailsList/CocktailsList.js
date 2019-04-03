import React from "react";
import { FlatList, StyleSheet, View, ActivityIndicator } from "react-native";
import CocktailsListItem from "./CocktailsListItem";

let onPress = null;
const CocktailsList = (props: Props) => {
  onPress = props.onPressItem;
  return (
    <View style={styles.container}>
      <FlatList
        style={styles.flatlist}
        data={props.data}
        keyExtractor={(item, index) => item.idDrink}
        renderItem={renderItem}
      />
    </View>
  );
};

renderItem = ({ item, index }) => {
  return <CocktailsListItem item={item} index={index} onPressItem={onPress} />;
};

export default CocktailsList;

const styles = StyleSheet.create({
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
  flatlist: {}
});
