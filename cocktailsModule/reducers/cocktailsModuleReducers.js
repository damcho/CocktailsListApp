import { combineReducers } from "redux";
import {
  REQUEST_COCKTAILS,
  RECEIVE_COCKTAILS
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
      return Object.assign({}, state, {
        isFetching: false,
        cocktails: action.cocktails,
        lastUpdated: action.receivedAt
      });
    default:
      return state;
  }
}

function cocktailsList(state = {}, action) {
  switch (action.type) {
    case REQUEST_COCKTAILS:
    case RECEIVE_COCKTAILS:
      let nextState = {};
      nextState = cocktails(state, action);
      return Object.assign({}, state, nextState);

    default:
      return state;
  }
}

const rootReducer = combineReducers({
  cocktailsList
});

export default rootReducer;
