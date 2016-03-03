import {TOGGLE_PERSON} from '../constants/ActionTypes';

/*eslint-disable indent*/
export default function forbidReducer(state = false, action) {
  switch (action.type) {
    case TOGGLE_PERSON:
      return !state;
    default:
      return state;
  }
}
