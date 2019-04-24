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
          defaultValue: ["1/2"]
        },
        {
          type: "select",
          name: "unit",
          label: "Unit",
          required: true,
          options: ["gr", "tea spoon", "cup", "splash"],
          defaultValue: ["cup"]
        },
        {
          type: "select",
          name: "beverage",
          label: "beverage",
          required: true,
          options: ["Vodka", "Gin", "Rum", "Wine"]
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

  return (
    <View style={styles.mainContainerView}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, alignItems: "stretch" }}
      >
        <TouchableHighlight
          onPress={props.imagePickerPressed}
          style={styles.imagePickerContainer}
        >
          <View>{cocktailImage}</View>
        </TouchableHighlight>

        <View style={styles.formContainer}>
          <GenerateForm
            ref={c => {
              this.CreateCocktailForm = c;
            }}
            fields={fields}
          />
          <Button
            style={styles.addIngredientButton}
            block
            onPress={() => this.login()}
          >
            <Text>Add Ingredient</Text>
          </Button>
        </View>
      </ScrollView>
      <View style={styles.createCocktailButton}>
        <Button block onPress={() => this.login()}>
          <Text>Create cocktail</Text>
        </Button>
      </View>
    </View>
  );
};

export default CreateCocktailForm;
