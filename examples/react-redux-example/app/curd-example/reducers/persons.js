import * as ActionTypes from '../constants/ActionTypes';

/**
 * state 数据结构
 const state = [
 {
   id: 0,
   firstName: '',
   lastName: ''
 }
 ];
 */

/*const initState = [{
  id: 0,
  firstName: '张',
  lastName: '三',
  completed: false
}];*/

/*eslint-disable indent*/
export default function personsReducer(state = [], action) {
  switch (action.type) {
    case ActionTypes.ADD_PERSON:
      // 更新 state 列表数据
      return [{
        id: state.reduce((maxId, person) => Math.max(person.id, maxId), -1) + 1,
        firstName: action.person.firstName,
        lastName: action.person.lastName,
        completed: false
      }, ...state];
    case ActionTypes.DELETE_PERSON:
      return state.filter(person =>
        person.id !== action.id
      );
    case ActionTypes.EDIT_PERSON:
      return state.map(person =>
        person.id === action.person.id ?
          Object.assign({}, person, {
            firstName: action.person.firstName,
            lastName: action.person.lastName
          }) :
          person
      );
    case ActionTypes.LIST_PERSON:
      return action.persons;
    case ActionTypes.CHANGE_STATUS:
      return state.map((person) => {
        if (person.id === action.id) {
          person.completed = !person.completed;
        }
        return person;
      });
    default:
      return state;
  }
}
