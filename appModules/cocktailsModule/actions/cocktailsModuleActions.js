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

function requestCocktailsAction(refreshing) {
  return {
    type: REQUEST_COCKTAILS,
    refreshing: refreshing
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

function parseResponse(json) {
  const measures = [];
  const beverages = [];
  var i;
  let key;
  for (i = 1; i < 6; i++) {
    key = "strMeasure" + i;
    mesure = json[key];
    measures.push(mesure);
  }
  key = "strIngredient";
  for (i = 1; i < 6; i++) {
    key = "strIngredient" + i;
    beverage = json[key];
    beverages.push(beverage);
  }
  const cocktailDetail = {
    strDrink: json.strDrink,
    measures: measures,
    beverages: beverages,
    idDrink: json.idDrink,
    strDrinkThumb: json.strDrinkThumb,
    strInstructions: json.strInstructions
  };
  return cocktailDetail;
}

function receivedCocktailDetailAction(cocktailDetail) {
  return {
    type: RECEIVE_COCKTAIL_DETAIL,
    cocktail: cocktailDetail
  };
}

export function fetchCocktailDetail(cocktailID) {
  return function(dispatch, getState) {
    dispatch(clearError());
    dispatch(requestCocktailDetailAction());
    const query = urlForCocktailsDetail(cocktailID);
    const cocktailDetail = getState().cocktailsRootReducer.cocktailsList
      .cocktails[cocktailID];

    //If instructions are available we don't request detail data
    if (cocktailDetail.strInstructions != null) {
      dispatch(receivedCocktailDetailAction(cocktailDetail));
    } else {
      dataHandler = data => {
        if (data._hasError) {
          dispatch(requestCocktailsFailed(data));
        } else {
          const cocktailDetail = parseResponse(data.drinks[0]);
          dispatch(receivedCocktailDetailAction(cocktailDetail));
        }
      };
      requestCocktails(query, dataHandler);
    }
  };
}

export function fetchCocktails(refreshing) {
  return function(dispatch) {
    const query = urlForCocktails();
    dispatch(clearError());
    dispatch(requestCocktailsAction(refreshing));

    dataHandler = data => {
      if (data._hasError) {
        dispatch(requestCocktailsFailed(data));
      } else {
        dispatch(receivedCocktailsAction(data));
      }
    };
    requestCocktails(query, dataHandler);
  };
}
