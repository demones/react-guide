import React, {Component, PropTypes} from 'react';
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
        {children}
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.node
};

export default connect()(App)
