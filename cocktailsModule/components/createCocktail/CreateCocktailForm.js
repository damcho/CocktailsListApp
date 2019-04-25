import React from "react";
import { View, Text, Button } from "native-base";
import GenerateForm from "react-native-form-builder";
import styles from "./CreateCocktail.styles.js";
import { Image, TouchableHighlight, ScrollView } from "react-native";

const CreateCocktailForm = (props: Props) => {
  const fields = [
    {
      type: "group",
      name: "ingredient",
      label: "Cocktai preparation ingredients",
      fields: [
        {
          type: "select",
          name: "amount",
          label: "Amount",
          required: true,
          options: ["1/4", "1/2", "1", "2", "3"],
          defaultValue: "1/4"
        },
        {
          type: "select",
          name: "unit",
          label: "Unit",
          required: true,
          options: ["gr", "tea spoon", "cup", "splash"],
          defaultValue: "cup"
        },
        {
          type: "select",
          name: "beverage",
          label: "beverage",
          required: true,
          options: ["Vodka", "Gin", "Rum", "Wine"],
          defaultValue: "Vodka"
        }
      ]
    },
    {
      type: "group",
      name: "instructions",
      label: "Cocktail preparation Instructions",
      fields: [
        {
          type: "text",
          name: "Instructions",
          label: "Add instructions",
          required: true,
          props: {
            multiline: true,
            numberOfLines: 3
          }
        }
      ]
    }
  ];
  const cocktailImage = props.cocktailImageUri ? (
    <Image
      style={styles.cocktailImage}
      source={{ uri: props.cocktailImageUri }}
    />
  ) : (
    <Text style={styles.selectPhotoText}>Select Photo </Text>
  );

  addIngredient = () => {
    console.log(this.createCocktailForm.getValues());
    const formValues = this.createCocktailForm.getValues();
    const measure =
      formValues.ingredient.amount + " " + formValues.ingredient.unit;
    const preparationIngredient = {
      measure: measure,
      ingredient: formValues.ingredient.beverage
    };

    props.onCocktailIngredientAdded(preparationIngredient);
  };

  addInstructions = () => {
    console.log(this.createCocktailForm.getValues());
    const formValues = this.createCocktailForm.getValues();
    props.onInstructionsAdded(formValues.instructions.Instructions);
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
            fields={fields}
            onValueChange={this.addInstructions}
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
          onPress={() => this.login()}
        >
          <Text>Create cocktail</Text>
        </Button>
      </View>
    </View>
  );
};

export default CreateCocktailForm;
