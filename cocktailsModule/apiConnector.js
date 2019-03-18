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
  axios
    .get(query)
    .then(response => {
      console.log(response.data);
      responseHandler(response.data);
    })
    .catch(error => {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log("response error");
        console.log(error.response);
        responseHandler(error.response);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log("request error");
        responseHandler(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
      }
    });
}
