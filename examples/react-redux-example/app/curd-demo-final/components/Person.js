import React, {Component, PropTypes} from 'react';
import PersonExplain from './PersonExplain';
import PersonForm from './PersonForm';
import PersonList from './PersonList';
import PersonTabs from './PersonTabs';
import curdActions from '../actions';

class Person extends Component {
  constructor(props, context) {
    super(props, context);
    console.info(context);
  }

  componentDidMount() {
    const {dispatch} = this.props;
    dispatch(curdActions.loadPerson());
  }

  render() {
    const {persons, tabs, actions, dispatch} = this.props;
    const tabsProps = {tabs, dispatch};
    return (
      <div>
        <PersonExplain/>
        <div className="container">
          <h3 className="m-b-2">增删改查</h3>
          <PersonForm addPerson={actions.addPerson}/>
          <hr/>
          <PersonList persons={persons} actions={actions}/>
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
