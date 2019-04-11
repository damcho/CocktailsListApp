import React from "react";
import { createStackNavigator, createAppContainer } from "react-navigation";
import CocktailsListContainer from "./cocktailsModule/components/cocktailsList/CocktailsListContainer";
import CocktailDetailContainer from "./cocktailsModule/components/cocktailDetail/CocktailDetailContainer";

const MainNavigator = createStackNavigator({
  Home: { screen: CocktailsListContainer },
  cocktailDetail: { screen: CocktailDetailContainer },
  initialRouteName: "CocktailsList"
});

const AppContainer = createAppContainer(MainNavigator);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}
