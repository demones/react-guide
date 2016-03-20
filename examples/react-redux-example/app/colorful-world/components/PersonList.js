import React, {Component, PropTypes} from 'react';
import PersonItem from './PersonItem';

class PersonList extends Component {
  componentDidMount() {
    // 如果 reducer 把 dispatch 也放到了 props 中，可以采用以下方式调用
    // import {loadPerson} from '../actions/person';
    // const {dispatch} = this.props;
    // dispatch(loadPerson());
    // 直接用以下方式处理，效果和上面是一样的，建议用这种方式，代码更清晰
    const {loadPerson} = this.props;
    loadPerson();
  }

  render() {
    const {persons, editPerson, deletePerson} = this.props;
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
  persons: PropTypes.array.isRequired,
  editPerson: PropTypes.func,
  deletePerson: PropTypes.func,
  loadPerson: PropTypes.func
}

export default PersonList;
