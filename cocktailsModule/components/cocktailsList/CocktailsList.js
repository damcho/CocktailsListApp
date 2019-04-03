import React from "react";
import { FlatList, StyleSheet, View, ActivityIndicator } from "react-native";
import CocktailsListItem from "./CocktailsListItem";
import styles from "./CocktailsList.styles.js";

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
