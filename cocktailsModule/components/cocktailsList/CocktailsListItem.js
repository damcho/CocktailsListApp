import React from "react";
import { TouchableHighlight, StyleSheet, Text, View } from "react-native";
import AsyncImage from "../common/AsyncImage";
import styles from "./CocktailsListItem.styles.js";
import Swipeable from "react-native-swipeable-row";

const CocktailsListItem = (props: Props) => {
  const onItemPressed = () => {
    props.onPressItem(props.index);
  };

  const onItemDeleted = () => {
    props.onDeleteItem(props.item.idDrink);
  };

  const leftContent = <Text>Pull to activate</Text>;
  const rightButtons = [
    <TouchableHighlight style={styles.deleteCellButton} onPress={onItemDeleted}>
      <Text style={styles.deleteCellButtonText}>DELETE</Text>
    </TouchableHighlight>
  ];
  return (
    <Swipeable leftContent={leftContent} rightButtons={rightButtons}>
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
    </Swipeable>
  );
};

export default CocktailsListItem;
