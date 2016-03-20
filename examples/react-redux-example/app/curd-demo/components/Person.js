import React, {Component, PropTypes} from 'react';
import PersonExplain from './PersonExplain';
import PersonForm from './PersonForm';
import PersonList from './PersonList';
import PersonTabs from './PersonTabs';

class Person extends Component {

  render() {
    const {persons, tabs, actions, dispatch} = this.props;
    const tabsProps = {tabs, dispatch};
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
        <PersonTabs {...tabsProps}/>
      </div>
    );
  }
}

Person.propTypes = {
  persons: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  dispatch: PropTypes.func,
  tabs: PropTypes.object
};

export default Person;
