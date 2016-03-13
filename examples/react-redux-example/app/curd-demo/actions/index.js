import * as ActionTypes from '../constants/ActionTypes';


export function addPerson(person) {
  return {
    type: ActionTypes.ADD_PERSON,
    person
  }
}

export function deletePerson(id) {
  return {
    type: ActionTypes.DELETE_PERSON,
    id
  }
}

export function listPerson(persons) {
  return {
    type: ActionTypes.LIST_PERSON,
    persons
  }
}

export function loadPerson(persons) {
  return (dispatch) => {
    setTimeout(() => {
      const persons = [{
        id: 1,
        firstName: 'zhang',
        lastName: 'san'
      }];
      dispatch(listPerson(persons));
    }, 300);
  }
}