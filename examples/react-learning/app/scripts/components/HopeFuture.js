import React, {Component, PropTypes} from 'react';

class HopeFuture extends Component {
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

HopeFuture.propTypes = {
  children: PropTypes.object.isRequired
};

export default HopeFuture;
