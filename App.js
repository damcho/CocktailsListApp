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

import ProfileScreenContainer from "./appModules/loginModule/components/profileScreen/ProfileScreenContainer";

import { Provider } from "react-redux";
import { combineReducers } from "redux";
import thunkMiddleware from "redux-thunk";
import { createLogger } from "redux-logger";
import { createStore, applyMiddleware } from "redux";

import cocktailsRootReducer from "./appModules/cocktailsModule/reducers/cocktailsModuleReducers";
import user from "./appModules/loginModule/reducers/loginModuleReducers";

console.disableYellowBox = true;

const cocktailsModuleNavigator = createStackNavigator(
  {
    cocktailsList: { screen: CocktailsListContainer },
    cocktailDetail: { screen: CocktailDetailContainer },
    createCocktail: { screen: CreateCocktailFormContainer }
  },
  {
    initialRouteName: "cocktailsList"
  }
);

const mainStackNavigator = createStackNavigator(
  {
    cocktailsModuleNavigator: { screen: cocktailsModuleNavigator },
    userProfile: { screen: ProfileScreenContainer }
  },
  {
    mode: "modal",
    headerMode: "none"
  }
);

const switchNavigator = createSwitchNavigator(
  {
    LoginScreenContainer,
    mainStackNavigator
  },
  {
    initialRouteName: "LoginScreenContainer"
  }
);

const rootReducer = combineReducers({
  cocktailsRootReducer,
  user
});

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
