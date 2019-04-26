import React from "react";
import { View, Text, Button } from "native-base";
import GenerateForm from "react-native-form-builder";
import styles from "./CreateCocktail.styles.js";
import { Image, TouchableHighlight, ScrollView } from "react-native";
import {
  ingredientsFormConfig,
  cocktailNameFormConfig,
  instructionsFormConfig
} from "./CreateCocktailFormConfig";

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
    const formValues = this.ingredientForm.getValues();
    const measure =
      formValues.ingredient.amount + " " + formValues.ingredient.unit;
    const preparationIngredient = {
      measure: measure,
      ingredient: formValues.ingredient.beverage
    };

    props.onCocktailIngredientAdded(preparationIngredient);
  };

  valueChanged = () => {
    const instructions = this.instructionsForm.getValues();
    const cocktailName = this.cocktailNameForm.getValues();

    const values = {
      instructions: instructions.instructions.Instructions,
      cocktailName: cocktailName.cocktaillName
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
        <View style={styles.formContainer}>
          <GenerateForm
            ref={c => {
              this.cocktailNameForm = c;
            }}
            fields={cocktailNameFormConfig}
            onValueChange={this.valueChanged}
          />

          <TouchableHighlight onPress={props.imagePickerPressed}>
            <View style={styles.imagePickerContainer}>{cocktailImage}</View>
          </TouchableHighlight>

          <GenerateForm
            ref={c => {
              this.ingredientForm = c;
            }}
            fields={ingredientsFormConfig}
          />
          <View style={styles.addIngredientButtonSection}>
            <Button
              style={styles.addIngredientButton}
              onPress={this.addIngredient}
            >
              <Text>Add Ingredient</Text>
            </Button>
          </View>

          {ingredients}

          <GenerateForm
            ref={c => {
              this.instructionsForm = c;
            }}
            fields={instructionsFormConfig}
            onValueChange={this.valueChanged}
          />
        </View>
      </ScrollView>

      <View style={styles.createCocktailButton}>
        <Button
          disabled={!props.isCreateCocktailEnabled}
          block
          onPress={props.onCreateCocktailPressed}
        >
          <Text>Save</Text>
        </Button>
      </View>
    </View>
  );
};

export default CreateCocktailForm;
