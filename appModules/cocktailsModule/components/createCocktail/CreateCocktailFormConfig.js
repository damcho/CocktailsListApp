export const cocktailNameFormConfig = [
  {
    type: "text",
    name: "cocktaillName",
    label: "Cocktail Name",
    required: true
  }
];

export const instructionsFormConfig = [
  {
    type: "group",
    name: "instructions",
    label: "Cocktail preparation",
    fields: [
      {
        type: "text",
        name: "Instructions",
        label: "Instructions",
        required: true,
        props: {
          multiline: true,
          numberOfLines: 3
        }
      }
    ]
  }
];

export const ingredientsFormConfig = [
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
  }
];
