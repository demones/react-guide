import React, {Component, PropTypes} from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {connect} from 'react-redux';

import Explain from '../components/Explain';
import DemoNav from '../components/DemoNav';

class App extends Component {
  render() {
    const {children} = this.props;
    return (
      <div>
        <Explain/>
        <DemoNav/>
        <ReactCSSTransitionGroup
          component="div"
          transitionName="example"
          transitionEnterTimeout={5000}
          transitionLeaveTimeout={5000}
        >
          {children}
        </ReactCSSTransitionGroup>
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.node
};

export default connect()(App)
