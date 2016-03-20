import * as ActionTypes from '../constants/ActionTypes';

/**
 * person 对象格式为
 {
  id: 0,
  firstName: '',
  lastName: ''
 }
 * @param state
 * @param action
 * @returns {*}
 */
export default function personReducer(state = [], action) {
  /*eslint-disable indent*/
  switch (action.type) {
    case ActionTypes.ADD_PERSON:
      return [{
        id: state.reduce((maxId, person) => Math.max(person.id, maxId), 0) + 1,
        firstName: action.person.firstName,
        lastName: action.person.lastName
      }, ...state];
    case ActionTypes.EDIT_PERSON:
      return state.map((person) => {
        return person.id === action.person.id ?
        {
          ...person,
          firstName: action.person.firstName,
          lastName: action.person.lastName
        } :
          person
      });
    case ActionTypes.DELETE_PERSON:
      return state.filter((person) => person.id !== action.id);
    case ActionTypes.LIST_PERSON:
      return action.persons;
    default:
      return state;
  }
}
