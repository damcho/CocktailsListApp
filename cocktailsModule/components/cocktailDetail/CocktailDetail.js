import React, { Component } from "react";
import {
  Text,
  Image,
  StyleSheet,
  View,
  ActivityIndicator,
  ScrollView,
  Alert
} from "react-native";
import AsyncImage from "../common/AsyncImage";
import styles from "./CocktailDetail.styles.js";

const CocktailDetail = (props: Props) => {
  const spinner = props.isLoading ? (
    <ActivityIndicator size="large" style={styles.spinner} />
  ) : null;

  const cocktailImage = props.cocktailImageUri ? (
    <AsyncImage
      style={styles.cocktailImage}
      source={{
        uri: props.cocktailImageUri
      }}
      placeholderColor="#b3e5fc"
    />
  ) : null;

  const ingredientsTitle =
    props.ingredients != null ? <Text>Ingredients:</Text> : null;
  const ingredientsList =
    props.ingredients != null
      ? props.ingredients.map(ingredient => {
          return <Text>{ingredient}</Text>;
        })
      : null;
  const instructionsTitle =
    props.instructions != null ? <Text>Instructions:</Text> : null;
  const instructions =
    props.instructions != null ? <Text>{props.instructions}</Text> : null;

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
      >
        {cocktailImage}
        <View style={styles.ingredientsContainer}>
          {ingredientsTitle}
          {ingredientsList}
        </View>
        <View style={styles.instructionsContainer}>
          {instructionsTitle}
          {instructions}
        </View>
      </ScrollView>
      {spinner}
    </View>
  );
};

export default CocktailDetail;
