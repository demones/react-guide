import React, {Component} from 'react';

class Index extends Component {
  constructor(props, context) {
    super(props, context);
  }

  render () {
    return (
      <div>
        <p>This is a Index component.</p>
        <div className="banner-img"></div>
      </div>
    );
  }
}

export default Index;
