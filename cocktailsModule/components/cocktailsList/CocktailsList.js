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

const CocktailsList = (props: Props) => {
  const spinner = props.isLoading ? (
    <ActivityIndicator style={styles.spinner} size="large" />
  ) : null;

  renderItem = ({ item, index }) => {
    return (
      <CocktailsListItem
        item={item}
        index={index}
        onPressItem={props.onPressItem}
        onDeleteItem={props.onDeleteItem}
      />
    );
  };

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

export default CocktailsList;
