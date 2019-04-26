import axios from "axios";

const scheme = "https://";
const host = "www.thecocktaildb.com";

export function urlForCocktails() {
  const path = "/api/json/v1/1/filter.php";
  const querystring = "?c=Cocktail";
  return scheme + host + path + querystring;
}

export function urlForCocktailsDetail(cocktailID) {
  const path = "/api/json/v1/1/lookup.php";
  const querystring = "?i=" + cocktailID;
  return scheme + host + path + querystring;
}

export function requestCocktails(query, responseHandler) {
  axios
    .get(query)
    .then(response => {
      responseHandler(response.data);
    })
    .catch(error => {
      if (error.response) {
        console.log(error.response);
        responseHandler(error.response);
      } else if (error.request) {
        responseHandler(error.request);
      } else {
        console.log("Error", error.message);
      }
    });
}
