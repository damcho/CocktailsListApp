import React from "react";
import { createStackNavigator, createAppContainer } from "react-navigation";
import CocktailsList from "./cocktailsModule/components/cocktailsList/CocktailsList";
import CocktailDetail from "./cocktailsModule/components/cocktailDetail/CocktailDetail";

const MainNavigator = createStackNavigator({
  Home: { screen: CocktailsList },
  cocktailDetail: { screen: CocktailDetail },
  initialRouteName: "CocktailsList"
});

const AppContainer = createAppContainer(MainNavigator);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}
