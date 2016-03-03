import * as ActionTypes from '../constants/ActionTypes';

export function addPerson(person) {
  return {
    type: ActionTypes.ADD_PERSON,
    person
  };
}

export function editPerson(person) {
  return {
    type: ActionTypes.EDIT_PERSON,
    person
  };
}

export function deletePerson(id) {
  return {
    type: ActionTypes.DELETE_PERSON,
    id
  };
}

export function listPerson(persons) {
  return {
    type: ActionTypes.LIST_PERSON,
    persons
  };
}

export function loadPerson() {
  return (dispatch) => {
    setTimeout(() => {
      const persons = [{
        id: 1,
        firstName: '张',
        lastName: '三'
      }];
      dispatch(listPerson(persons));
    }, 300);
  }
}
