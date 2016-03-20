import merge from 'lodash/merge'
import * as GithubActionType from '../constants/GithubActionType';

export function entities(state = {users: {}, repos: {}}, action) {
  if (action.response && action.response.entities) {
    return merge({}, state, action.response.entities)
  }
  return state;
}

// Updates error message to notify about the failed fetches.
export function errorMessage(state = null, action) {
  const {type, error} = action;

  if (type === GithubActionType.RESET_ERROR_MESSAGE) {
    return null;
  } else if (error) {
    return action.error;
  }

  return state;
}
