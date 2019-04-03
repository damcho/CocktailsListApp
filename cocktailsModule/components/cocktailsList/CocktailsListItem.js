import React from "react";
import { TouchableHighlight, StyleSheet, Text, View } from "react-native";
import AsyncImage from "../common/AsyncImage";
import styles from "./CocktailsListItem.styles.js";

const CocktailsListItem = (props: Props) => {
  const onItemPressed = index => {
    props.onPressItem(props.index);
  };
  return (
    <TouchableHighlight onPress={onItemPressed} underlayColor="#dddddd">
      <View>
        <View style={styles.rowContainer}>
          <AsyncImage
            style={styles.thumb}
            source={{
              uri: props.item.strDrinkThumb
            }}
            placeholderColor="#b3e5fc"
          />
          <View style={styles.textContainer}>
            <Text style={styles.cocktailName}>{props.item.strDrink}</Text>
          </View>
        </View>
        <View style={styles.separator} />
      </View>
    </TouchableHighlight>
  );
};

export default CocktailsListItem;
