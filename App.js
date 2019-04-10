import React from "react";
import { createStackNavigator, createAppContainer } from "react-navigation";
import CocktailsListContainer from "./cocktailsModule/components/cocktailsList/CocktailsListContainer";
import CocktailDetailContainer from "./cocktailsModule/components/cocktailDetail/CocktailDetailContainer";
import { Provider } from "react-redux";

import thunkMiddleware from "redux-thunk";
import { createLogger } from "redux-logger";
import { createStore, applyMiddleware } from "redux";
import rootReducer from "./cocktailsModule/reducers/cocktailsModuleReducers";

const MainNavigator = createStackNavigator({
  Home: { screen: CocktailsListContainer },
  cocktailDetail: { screen: CocktailDetailContainer },
  initialRouteName: "CocktailsList"
});
const AppContainer = createAppContainer(MainNavigator);

const loggerMiddleware = createLogger();

const store = createStore(
  rootReducer,
  applyMiddleware(
    thunkMiddleware, // lets us dispatch() functions
    loggerMiddleware // neat middleware that logs actions
  )
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
