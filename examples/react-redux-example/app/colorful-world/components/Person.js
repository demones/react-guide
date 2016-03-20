import React, {Component, PropTypes} from 'react';
import PersonForm from './PersonForm';
import PersonList from './PersonList';

class Person extends Component {

  render() {
    const {persons, addPerson, editPerson, deletePerson, loadPerson} = this.props;
    const personListProps = {
      persons,
      editPerson,
      deletePerson,
      loadPerson
    };
    return (
      <div>
        <div className="container">
          <PersonForm addPerson={addPerson}/>
          <hr/>
          <PersonList {...personListProps}/>
        </div>
      </div>
    );
  }
}

Person.propTypes = {
  persons: PropTypes.array.isRequired,
  addPerson: PropTypes.func, 
  editPerson: PropTypes.func, 
  deletePerson: PropTypes.func, 
  loadPerson: PropTypes.func
};

export default Person;
