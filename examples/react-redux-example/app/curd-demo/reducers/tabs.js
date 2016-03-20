import assign from 'lodash/assign';
import * as TabActionType from '../constants/TabActionType';

/*eslint-disable indent*/
export default function fetchData (state = {
  isFetching: false,
  code: 'beijing',
  intro: ''
}, action) {
  switch (action.type) {
    case TabActionType.FETCH_RECEIVE:
      return assign({}, state, {
        code: action.code,
        intro: action.intro
      });
    default:
      return state;
  }
}