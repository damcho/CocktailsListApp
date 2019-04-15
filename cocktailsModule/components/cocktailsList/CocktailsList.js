import React from "react";
import {
  FlatList,
  StyleSheet,
  View,
  ActivityIndicator,
  RefreshControl
} from "react-native";
import CocktailsListItem from "./CocktailsListItem";
import styles from "./CocktailsList.styles.js";

let onPress = null;
const CocktailsList = (props: Props) => {
  onPress = props.onPressItem;
  const spinner = props.isLoading ? (
    <ActivityIndicator style={styles.spinner} size="large" />
  ) : null;

  return (
    <View style={styles.container}>
      <FlatList
        refreshControl={
          <RefreshControl
            refreshing={props.isLoading}
            onRefresh={props.onRefreshList}
          />
        }
        style={styles.flatlist}
        data={props.data}
        keyExtractor={(item, index) => item.idDrink}
        renderItem={renderItem}
      />
      {spinner}
    </View>
  );
};

renderItem = ({ item, index }) => {
  return <CocktailsListItem item={item} index={index} onPressItem={onPress} />;
};

export default CocktailsList;
