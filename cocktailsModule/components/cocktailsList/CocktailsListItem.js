import React, { Component } from "react";
import {
  TouchableHighlight,
  StyleSheet,
  Text,
  View,
  Image
} from "react-native";
import AsyncImage from "../common/AsyncImage";

export default class CocktailsListItem extends Component {
  onPress = () => {
    this.props.onPressItem(this.props.index);
  };

  render() {
    const item = this.props.item;
    return (
      <TouchableHighlight onPress={this.onPress} underlayColor="#dddddd">
        <View>
          <View style={styles.rowContainer}>
            <AsyncImage
              style={styles.thumb}
              source={{
                uri: item.strDrinkThumb
              }}
              placeholderColor="#b3e5fc"
            />
            <View style={styles.textContainer}>
              <Text style={styles.cocktailName}>{item.strDrink}</Text>
            </View>
          </View>
          <View style={styles.separator} />
        </View>
      </TouchableHighlight>
    );
  }
}

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
