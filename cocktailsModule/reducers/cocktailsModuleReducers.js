import { combineReducers } from "redux";
import {
  REQUEST_COCKTAILS,
  RECEIVE_COCKTAILS,
  RECEIVE_COCKTAIL_DETAIL,
  REQUEST_COCKTAIL_DETAIL
} from "../actions/cocktailsModuleActions";

function cocktails(
  state = {
    isFetching: false,
    cocktails: []
  },
  action
) {
  switch (action.type) {
    case REQUEST_COCKTAILS:
      return Object.assign({}, state, {
        isFetching: true
      });
    case RECEIVE_COCKTAILS:
      const cocktailIds = [];
      const normalizedCocktailsArray = action.cocktails.reduce(
        (acumulator, cockObj) => {
          acumulator[cockObj.idDrink] = cockObj;
          cocktailIds.push(cockObj.idDrink);
          return acumulator;
        }
      );
      return Object.assign({}, state, {
        isFetching: false,
        cocktails: normalizedCocktailsArray,
        cocktailIds: cocktailIds
      });
    default:
      return state;
  }
}

function cocktailDetail(state = {}, action) {}

function cocktailsList(state = {}, action) {
  switch (action.type) {
    case REQUEST_COCKTAILS:
    case RECEIVE_COCKTAILS:
      let nextState = {};
      nextState = cocktails(state, action);
      return Object.assign({}, state, nextState);
    case RECEIVE_COCKTAIL_DETAIL:
      const newState = { ...state };
      console.log("recibido detalle");
      newState.cocktails[action.cocktail.idDrink] = action.cocktail;
      return newState;
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  cocktailsList
});

export default rootReducer;
