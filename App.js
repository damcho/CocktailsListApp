import React from "react";
import {
  createStackNavigator,
  createAppContainer,
  createSwitchNavigator
} from "react-navigation";

import CocktailsListContainer from "./appModules/cocktailsModule/components/cocktailsList/CocktailsListContainer";
import CocktailDetailContainer from "./appModules/cocktailsModule/components/cocktailDetail/CocktailDetailContainer";
import CreateCocktailFormContainer from "./appModules/cocktailsModule/components/createCocktail/CreateCocktailFormContainer";
import LoginScreenContainer from "./appModules/loginModule/components/loginScreen/LoginScreenContainer";

import { Provider } from "react-redux";
import { combineReducers } from "redux";
import thunkMiddleware from "redux-thunk";
import { createLogger } from "redux-logger";
import { createStore, applyMiddleware } from "redux";

import cocktailsRootReducer from "./appModules/cocktailsModule/reducers/cocktailsModuleReducers";
import user from "./appModules/loginModule/reducers/loginModuleReducers";

console.disableYellowBox = true;

const cocktailsModuleNavigator = createStackNavigator({
  Home: { screen: CocktailsListContainer },
  cocktailDetail: { screen: CocktailDetailContainer },
  createCocktail: CreateCocktailFormContainer,
  initialRouteName: "CocktailsList"
});

const rootReducer = combineReducers({
  cocktailsRootReducer,
  user
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
