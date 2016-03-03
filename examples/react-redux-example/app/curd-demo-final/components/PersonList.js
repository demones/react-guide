import React, {Component, PropTypes} from 'react';
import PersonItem from './PersonItem';

class PersonList extends Component {
  constructor(props) {
    super(props);
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
          persons.map((person, index) => {
            return (
              <PersonItem key={index} person={person} {...operate}/>
            );
          })
        }
        </tbody>
      </table>
    );
  }
}

PersonList.propTypes = {
  persons: PropTypes.array.isRequired,
  actions: PropTypes.object
};

export default PersonList;
