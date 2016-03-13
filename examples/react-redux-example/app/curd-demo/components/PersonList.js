import React, {Component, PropTypes} from 'react';
import PersonItem from './PersonItem';
import * as Actions from '../actions';

class PersonList extends Component {
  componentDidMount() {
    const {dispatch} = this.props;
    dispatch(Actions.loadPerson());
  }

  render() {
    const {persons} = this.props;
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
              <PersonItem key={person.id}  person={person}/>
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
  persons: PropTypes.array
}

export default PersonList;
