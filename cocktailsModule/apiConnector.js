import axios from "axios";

const scheme = "https://";
const host = "www.thecocktaildb.com";

export function urlForCocktails(key, value, pageNumber) {
  const path = "/api/json/v1/1/filter.php";

  const querystring = "?c=Cocktail";

  /*
    const querystring = Object.keys(data)
      .map(key => key + "=" + encodeURIComponent(data[key]))
      .join("&");
  */
  return scheme + host + path + querystring;
}

export function urlForCocktailsDetail(cocktailID) {
  const path = "/api/json/v1/1/lookup.php";
  const querystring = "?i=" + cocktailID;

  return scheme + host + path + querystring;
}

export function requestCocktails(query, responseHandler) {
  axios.get(query).then(response => {
    console.log(response.data);
    responseHandler(response.data);
  });
}
