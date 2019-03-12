import axios from "axios";

export function urlForQueryAndPage(key, value, pageNumber) {
  const scheme = "https://";
  const host = "www.thecocktaildb.com";
  const path = "/api/json/v1/1/filter.php?";

  const data = {
    c: "Cocktail"
  };
  data[key] = value;

  const querystring = Object.keys(data)
    .map(key => key + "=" + encodeURIComponent(data[key]))
    .join("&");

  return scheme + host + path + querystring;
}

export function requestCocktails(query, responseHandler) {
  axios.get(query).then(response => {
    console.log(response.data);
    responseHandler(response.data);
  });
}
