import { combineReducers } from "redux";
import {
  REQUEST_COCKTAILS,
  RECEIVE_COCKTAILS,
  RECEIVE_COCKTAIL_DETAIL,
  REQUEST_COCKTAIL_DETAIL,
  DELETE_COCKTAIL,
  REQUEST_COCKTAILS_FAILED,
  CLEAR_ERROR,
  CREATE_COCKTAIL
} from "../actions/cocktailsModuleActions";

function cocktails(state, action) {
  const cocktailIds = [];
  const normalizedCocktailsArray = action.cocktails.reduce(
    (acumulator, cockObj) => {
      acumulator[cockObj.idDrink] = cockObj;
      cocktailIds.push(cockObj.idDrink);
      return acumulator;
    }
  );
  return {
    ...state,
    isFetching: false,
    cocktails: normalizedCocktailsArray,
    cocktailIds: cocktailIds
  };
}

function error(state = {}, action) {
  switch (action.type) {
    case REQUEST_COCKTAILS_FAILED:
      console.log(action.error);
      return action.error;
    case CLEAR_ERROR:
      return null;
    default:
      return null;
  }
}

function cocktailsList(state = {}, action) {
  switch (action.type) {
    case REQUEST_COCKTAILS:
    case REQUEST_COCKTAIL_DETAIL:
      return { ...state, isFetching: true };
    case RECEIVE_COCKTAILS:
      return cocktails(state, action);
    case RECEIVE_COCKTAIL_DETAIL:
      const newState = { ...state, isFetching: false };
      newState.cocktails[action.cocktail.idDrink] = action.cocktail;
      return newState;
    case CREATE_COCKTAIL:
      const cocktailId = action.cocktail.idDrink;
      const normalizedcocktails = { ...state.cocktails };
      normalizedcocktails[cocktailId] = action.cocktail;
      const cocktailIds = [...state.cocktailIds, cocktailId];
      return {
        ...state,
        cocktailIds: cocktailIds,
        cocktails: normalizedcocktails
      };
    case DELETE_COCKTAIL:
      const newState2 = {
        ...state
      };
      const filtercocktailIDs = state.cocktailIds.filter(
        cocktailID => cocktailID != action.cocktailID
      );

      newState2.cocktailIds = filtercocktailIDs;
      delete newState2.cocktails[action.cocktailID];
      return newState2;
    case REQUEST_COCKTAILS_FAILED:
      return { ...state, isFetching: false };

    default:
      return state;
  }
}

const rootReducer = combineReducers({
  cocktailsList,
  error
});

export default rootReducer;
