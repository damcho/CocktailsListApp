import React from "react";
import { createStackNavigator, createAppContainer } from "react-navigation";
import CocktailsListContainer from "./cocktailsModule/components/cocktailsList/CocktailsListContainer";
import CocktailDetail from "./cocktailsModule/components/cocktailDetail/CocktailDetail";

const MainNavigator = createStackNavigator({
  Home: { screen: CocktailsListContainer },
  cocktailDetail: { screen: CocktailDetail },
  initialRouteName: "CocktailsList"
});

const AppContainer = createAppContainer(MainNavigator);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}
