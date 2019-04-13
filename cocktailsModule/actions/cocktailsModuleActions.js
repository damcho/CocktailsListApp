import {
  urlForCocktails,
  urlForCocktailsDetail,
  requestCocktails
} from "../apiConnector";

export const REQUEST_COCKTAILS = "REQUEST_COCKTAILS";
export const RECEIVE_COCKTAILS = "RECEIVE_COCKTAILS";
export const REQUEST_COCKTAIL_DETAIL = "REQUEST_COCKTAIL_DETAIL";
export const RECEIVE_COCKTAIL_DETAIL = "RECEIVE_COCKTAIL_DETAIL";

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
    cocktail: json.drinks[0]
  };
}

export function fetchCocktailDetail(cocktailID) {
  return function(dispatch) {
    dispatch(requestCocktailDetailAction());
    const query = urlForCocktailsDetail(cocktailID);

    dataHandler = data => {
      if (data._hasError) {
        Alert.alert("Error", data._response);
        this.setState({ cocktails: null, isLoading: false });
      } else {
        dispatch(receivedCocktailDetailAction(data));
      }
    };
    return requestCocktails(query, dataHandler);
  };
}

export function fetchCocktails() {
  return function(dispatch) {
    const query = urlForCocktails();
    dispatch(requestCocktailsAction());
    dataHandler = data => {
      if (data._hasError) {
        Alert.alert("Error", data._response);
        this.setState({ cocktails: null, isLoading: false });
      } else {
        dispatch(receivedCocktailsAction(data));
      }
    };
    return requestCocktails(query, dataHandler);
  };
}
