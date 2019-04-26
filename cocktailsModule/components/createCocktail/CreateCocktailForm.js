import React from "react";
import { View, Text, Button } from "native-base";
import GenerateForm from "react-native-form-builder";
import styles from "./CreateCocktail.styles.js";
import { Image, TouchableHighlight, ScrollView } from "react-native";
import { createCocktailFormConfig } from "./CreateCocktailFormConfig";

const CreateCocktailForm = (props: Props) => {
  const cocktailImage = props.cocktailImageUri ? (
    <Image
      style={styles.cocktailImage}
      source={{ uri: props.cocktailImageUri }}
    />
  ) : (
    <Text style={styles.selectPhotoText}>Select Photo </Text>
  );

  addIngredient = () => {
    const formValues = this.createCocktailForm.getValues();
    const measure =
      formValues.ingredient.amount + " " + formValues.ingredient.unit;
    const preparationIngredient = {
      measure: measure,
      ingredient: formValues.ingredient.beverage
    };

    props.onCocktailIngredientAdded(preparationIngredient);
  };

  valueChanged = () => {
    const formValues = this.createCocktailForm.getValues();
    const values = {
      instructions: formValues.instructions.Instructions,
      cocktailName: formValues.cocktaillName
    };
    props.onDataChanged(values);
  };

  const ingredients = props.measures.map((measure, index) => {
    const ingredientText = measure + " of " + props.ingredients[index];
    return (
      <View style={styles.ingredientContainerView}>
        <Text style={styles.ingredientItem} key={ingredientText}>
          {ingredientText}
        </Text>
      </View>
    );
  });

  return (
    <View style={styles.mainContainerView}>
      <ScrollView
        style={styles.scrollView}
        scontentContainerStyle={{ alignItems: "stretch" }}
      >
        <TouchableHighlight onPress={props.imagePickerPressed}>
          <View style={styles.imagePickerContainer}>{cocktailImage}</View>
        </TouchableHighlight>

        <View style={styles.formContainer}>
          <GenerateForm
            ref={c => {
              this.createCocktailForm = c;
            }}
            fields={createCocktailFormConfig}
            onValueChange={this.valueChanged}
          />

          <Button
            style={styles.addIngredientButton}
            block
            onPress={this.addIngredient}
          >
            <Text>Add Ingredient</Text>
          </Button>

          {ingredients}
        </View>
      </ScrollView>

      <View style={styles.createCocktailButton}>
        <Button
          disabled={!props.isCreateCocktailEnabled}
          block
          onPress={props.onCreateCocktailPressed}
        >
          <Text>Create cocktail</Text>
        </Button>
      </View>
    </View>
  );
};

export default CreateCocktailForm;
