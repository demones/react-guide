import * as ActionTypes from '../constants/ActionTypes';

/*eslint-disable indent*/
export default function personsReducer(state = [], action) {
  switch (action.type) {
    case ActionTypes.ADD_PERSON:
      // 更新 state 列表数据
      return [{
        id: state.reduce((maxId, person) => Math.max(person.id, maxId), -1) + 1,
        firstName: action.person.firstName,
        lastName: action.person.lastName
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
    default:
      return state;
  }
}