import {
  urlForCocktails,
  urlForCocktailsDetail,
  requestCocktails
} from "../apiConnector";

export const REQUEST_COCKTAILS = "REQUEST_COCKTAILS";
export const REQUEST_COCKTAILS_FAILED = "REQUEST_COCKTAILS_FAILED";
export const RECEIVE_COCKTAILS = "RECEIVE_COCKTAILS";

export const REQUEST_COCKTAIL_DETAIL = "REQUEST_COCKTAIL_DETAIL";
export const REQUEST_COCKTAIL_DETAIL_FAILED = "REQUEST_COCKTAIL_DETAIL_FAILED";
export const RECEIVE_COCKTAIL_DETAIL = "RECEIVE_COCKTAIL_DETAIL";

export const DELETE_COCKTAIL = "DELETE_COCKTAIL";
export const CLEAR_ERROR = "CLEAR_ERROR";

export const CREATE_COCKTAIL = "CREATE_COCKTAIL";

export function createCocktail(cocktail) {
  return {
    type: CREATE_COCKTAIL,
    cocktail: cocktail
  };
}

export function clearError() {
  return {
    type: CLEAR_ERROR
  };
}
function requestCocktailsFailed(error) {
  return {
    type: REQUEST_COCKTAILS_FAILED,
    error: error
  };
}
export function deleteCocktail(cocktailID) {
  return {
    type: DELETE_COCKTAIL,
    cocktailID: cocktailID
  };
}

function requestCocktailsAction() {
  return {
    type: REQUEST_COCKTAILS
  };
}

function requestCocktailDetailAction() {
  return {
    type: REQUEST_COCKTAIL_DETAIL
  };
}

function receivedCocktailsAction(json) {
  return {
    type: RECEIVE_COCKTAILS,
    cocktails: json.drinks,
    receivedAt: Date.now()
  };
}

function receivedCocktailDetailAction(json) {
  return {
    type: RECEIVE_COCKTAIL_DETAIL,
    cocktail: json
  };
}

export function fetchCocktailDetail(cocktailID) {
  return function(dispatch, getState) {
    dispatch(requestCocktailDetailAction());
    const query = urlForCocktailsDetail(cocktailID);
    const cocktailDetail = getState().cocktailsList.cocktails[cocktailID];
    if (cocktailDetail.strInstructions != null) {
      dispatch(receivedCocktailDetailAction(cocktailDetail));
      return null;
    } else {
      dataHandler = data => {
        if (data._hasError) {
          dispatch(requestCocktailsFailed(data));
        } else {
          dispatch(receivedCocktailDetailAction(data.drinks[0]));
        }
      };
      return requestCocktails(query, dataHandler);
    }
  };
}

export function fetchCocktails() {
  return function(dispatch) {
    const query = urlForCocktails();
    dispatch(requestCocktailsAction());
    dataHandler = data => {
      console.log(data);
      if (data._hasError) {
        dispatch(requestCocktailsFailed(data));
      } else {
        dispatch(receivedCocktailsAction(data));
      }
    };
    return requestCocktails(query, dataHandler);
  };
}
