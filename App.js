import React from "react";
import {
  createStackNavigator,
  createAppContainer,
  createSwitchNavigator
} from "react-navigation";
import CocktailsListContainer from "./cocktailsModule/components/cocktailsList/CocktailsListContainer";
import CocktailDetailContainer from "./cocktailsModule/components/cocktailDetail/CocktailDetailContainer";
import CreateCocktailFormContainer from "./cocktailsModule/components/createCocktail/CreateCocktailFormContainer";
import LoginScreenContainer from "./loginModule/LoginScreenContainer";
import { Provider } from "react-redux";
import thunkMiddleware from "redux-thunk";
import { createLogger } from "redux-logger";
import { createStore, applyMiddleware } from "redux";
import rootReducer from "./cocktailsModule/reducers/cocktailsModuleReducers";
console.disableYellowBox = true;

const cocktailsModuleNavigator = createStackNavigator({
  Home: { screen: CocktailsListContainer },
  cocktailDetail: { screen: CocktailDetailContainer },
  createCocktail: CreateCocktailFormContainer,
  initialRouteName: "CocktailsList"
});

const switchNavigator = createSwitchNavigator(
  {
    LoginScreenContainer,
    cocktailsModuleNavigator
  },
  {
    initialRouteName: "LoginScreenContainer"
  }
);

const AppContainer = createAppContainer(switchNavigator);
const loggerMiddleware = createLogger();

const store = createStore(
  rootReducer,
  applyMiddleware(thunkMiddleware, loggerMiddleware)
);

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    );
  }
}
