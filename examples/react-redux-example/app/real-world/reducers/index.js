import * as ActionTypes from '../actions';
import lodashObject from 'lodash/object';
import paginate from './paginate';
import { routerStateReducer as router } from 'redux-router';
import { combineReducers } from 'redux';

// Updates an entity cache in response to any action with response.entities.
function entities(state = { users: {}, repos: {} }, action) {
  if (action.response && action.response.entities) {
    return lodashObject.merge({}, state, action.response.entities);
  }

  return state;
}

// Updates error message to notify about the failed fetches.
function errorMessage(state = null, action) {
  const { type, error } = action;

  if (type === ActionTypes.RESET_ERROR_MESSAGE) {
    return null;
  } else if (error) {
    return action.error;
  }

  return state;
}

// Updates the pagination data for different actions.
const pagination = combineReducers({
  starredByUser: paginate({
    mapActionToKey: action => action.login,
    types: [
      ActionTypes.STARRED_REQUEST,
      ActionTypes.STARRED_SUCCESS,
      ActionTypes.STARRED_FAILURE
    ]
  }),
  stargazersByRepo: paginate({
    mapActionToKey: action => action.fullName,
    types: [
      ActionTypes.STARGAZERS_REQUEST,
      ActionTypes.STARGAZERS_SUCCESS,
      ActionTypes.STARGAZERS_FAILURE
    ]
  })
});

const rootReducer = combineReducers({
  entities,
  pagination,
  errorMessage,
  router
});

export default rootReducer;