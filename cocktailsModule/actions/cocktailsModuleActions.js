import { urlForCocktails, requestCocktails } from "../apiConnector";

export const REQUEST_COCKTAILS = "REQUEST_COCKTAILS";

function requestCocktailsAction() {
  return {
    type: REQUEST_COCKTAILS
  };
}

export const RECEIVE_COCKTAILS = "RECEIVE_COCKTAILS";

function receivedCocktailsAction(json) {
  return {
    type: RECEIVE_COCKTAILS,
    cocktails: json.drinks,
    receivedAt: Date.now()
  };
}

export function fetchCocktails() {
  return function(dispatch) {
    dispatch(requestCocktailsAction());
    const query = urlForCocktails();
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
