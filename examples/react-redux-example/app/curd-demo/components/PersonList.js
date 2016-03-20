import React, {Component, PropTypes} from 'react';
import PersonItem from './PersonItem';
import curdActions from '../actions';

class PersonList extends Component {
  componentDidMount() {
    const {dispatch} = this.props;
    dispatch(curdActions.loadPerson());
  }

  render() {
    const {persons, actions} = this.props;
    const {editPerson, deletePerson} = actions;
    const operate = {editPerson, deletePerson};
    return (
      <table className="table">
        <thead className="thead-inverse">
        <tr>
          <th>#</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Username</th>
          <th></th>
        </tr>
        </thead>
        <tbody>
        {
          persons.map((person) => {
            return (
              <PersonItem key={person.id} {...operate} person={person}/>
            );
          })
        }
        </tbody>
      </table>
    );
  }
}

PersonList.propTypes = {
  dispatch: PropTypes.func,
  persons: PropTypes.array.isRequired,
  actions: PropTypes.object
}

export default PersonList;
