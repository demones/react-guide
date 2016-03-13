import React, {Component, PropTypes} from 'react';
import classnames from 'classnames';
import curdActions from '../actions';

class PersonTabs extends Component {

  componentDidMount() {
    const {dispatch, tabs} = this.props;
    dispatch(curdActions.fetchIntro(tabs.code));
  }

  switchTab(tab, event) {
    event.preventDefault();
    const {dispatch} = this.props;
    dispatch(curdActions.fetchIntro(tab));
  }

  render() {
    const {tabs} = this.props;
    return (
      <div className="container">
        <h3 className="m-b-2 m-t-3">切换标签</h3>
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <a className={classnames({'nav-link': true, active: tabs.code === 'beijing'})}
               onClick={this.switchTab.bind(this, 'beijing')} href="">北京</a>
          </li>
          <li className="nav-item">
            <a className={classnames({'nav-link': true, active: tabs.code === 'hebei'})}
               onClick={this.switchTab.bind(this, 'hebei')} href="">河北</a>
          </li>
        </ul>

        <div className="tab-content m-t-1">
          <div className={classnames({'tab-pane': true, active: tabs.code === 'beijing'})}>
            {tabs.intro}
          </div>
          <div className={classnames({'tab-pane': true, active: tabs.code === 'hebei'})}>
            {tabs.intro}
          </div>
        </div>
      </div>
    );
  }
}

PersonTabs.propTypes = {
  dispatch: PropTypes.func,
  tabs: PropTypes.object
};

export default PersonTabs;
