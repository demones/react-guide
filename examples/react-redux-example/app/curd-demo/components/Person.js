import React, {Component, PropTypes} from 'react';
import PersonForm from './PersonForm';
import PersonExplain from './PersonExplain';
import PersonList from './PersonList';

class Person extends Component {

  render() {
    const {actions, persons, dispatch} = this.props;
    const listProps = {
      actions,
      persons,
      dispatch
    };
    return (
      <div>
        <PersonExplain/>

        <div className="container">
          <h3 className="m-b-2">增删改查</h3>
          <PersonForm addPerson={actions.addPerson}/>
          <hr/>
          <PersonList {...listProps}/>
        </div>

        <div className="container">
          <h3 className="m-b-2 m-t-3">切换标签</h3>
          <ul className="nav nav-tabs">
            <li className="nav-item">
              <a className="nav-link active" href="">北京</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="">河北</a>
            </li>
          </ul>

          <div className="tab-content m-t-1">
            <div className="tab-pane active" >北京 loading</div>
            <div className="tab-pane">河北 loading</div>
          </div>
        </div>
      </div>
    );
  }
}

Person.propTypes = {
  persons: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  dispatch: PropTypes.func
};

export default Person;
