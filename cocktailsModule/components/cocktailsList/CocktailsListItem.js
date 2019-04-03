import React from "react";
import { TouchableHighlight, StyleSheet, Text, View } from "react-native";
import AsyncImage from "../common/AsyncImage";

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

const styles = StyleSheet.create({
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
  }
});
