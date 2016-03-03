import {VisibilityFilters} from '../constants/ActionTypes';
const {SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE} = VisibilityFilters;

/*eslint-disable indent*/
export default function filterReducer(state = 'all', action) {
  switch (action.type) {
    case SHOW_ALL:
      return 'all';
    case SHOW_COMPLETED:
      return 'completed';
    case SHOW_ACTIVE:
      return 'active';
    default:
      return state;
  }
}
