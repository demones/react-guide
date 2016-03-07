import React, {Component} from 'react';
import PersonItem from './PersonItem';
import * as Actions from '../actions';

class PersonList extends Component {
  constructor(props) {
    super(props);
  }

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
          persons.map((person, index) => {
            return (
              <PersonItem key={index} person={person}/>
            );
          })
        }
        </tbody>
      </table>
    );
  }
}

export default PersonList;
