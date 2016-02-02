import { combineReducers } from 'redux';
import undoable, { distinctState } from 'redux-undo';

import { ADD_TODO, COMPLETE_TODO, SET_VISIBILITY_FILTER, VisibilityFilters } from './actions';
const { SHOW_ALL } = VisibilityFilters;

/*eslint-disable indent*/
function visibilityFilter(state = SHOW_ALL, action) {
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      return action.filter;
    default:
      return state;
  }
}

function todo(state, action) {
  switch (action.type) {
    case ADD_TODO:
      return {
        id: action.id,
        text: action.text,
        completed: false
      };
    case COMPLETE_TODO:
      if (state.id !== action.id) {
        return state;
      }
      //以下写法需要 babel-preset-stage-0 否则会报错，实现相当于 Object.assign({}, state || {}, {completed: true});
      return {
        ...state,
        completed: true
      };

    default:
      return state;
  }
}

function todos(state = [], action) {
  switch (action.type) {
    case ADD_TODO:
      return [
        ...state,
        todo(undefined, action)
      ];
    case COMPLETE_TODO:
      return state.map(t =>
        todo(t, action)
      );
    default:
      return state;
  }
}

const todoApp = combineReducers({
  visibilityFilter,
  todos: undoable(todos, {filter: distinctState()})
});

export default todoApp;
