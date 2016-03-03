import React, {Component, PropTypes} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import ReduxExplain from './ReduxExplain';
import PersonForm from './PersonForm';
import PersonItem from './PersonItem';
import PersonFilter from './PersonFilter';
import {loadingPerson} from '../actions';

class PersonList extends Component {
  constructor(props, context) {
    super(props, context);
    console.info(this.props);
    console.info(this.state);
  }

  componentDidMount() {
    // 这些 props 属性是通过 mapStateToProps 来设置的
    const { dispatch } = this.props;
    // 在 store 返回的 dispatch 中只能传入 action，这里之所以可以传入函数
    // 是因为我们用到了中间件，中间件会接着调用传入的函数，直到找到 dispatch(action) 来处理对应的 action
    dispatch(loadingPerson());  
  }

  render() {
    const {persons, filter, actions} = this.props;

    return (
      <div>
        <ReduxExplain/>
        <div className="container">
          <PersonForm filterSave={actions.filterSave} togglePerson={actions.togglePerson}/>
          <hr/>
          <PersonFilter {...actions}/>
          <hr/>
          <table className="table">
            <thead className="thead-inverse">
            <tr>
              <th></th>
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
                if (filter === 'all') {
                  return (<PersonItem key={person.id} person={person} {...actions}/>);
                } else if (filter === 'completed') {
                  return person.completed ? (<PersonItem key={person.id} person={person} {...actions}/>) : null;
                }
                return !person.completed ? (<PersonItem key={person.id} person={person} {...actions}/>) : null;
              })
            }
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

PersonList.propTypes = {
  persons: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  filter: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired
};

export default PersonList;
