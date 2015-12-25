import React, {Component} from 'react';
import moment from 'moment';

class Index extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      currentTime: moment()
    };
  }

  componentWillMount() {
    setInterval(() => {
      const currentTime = this.state.currentTime;
      currentTime.add(1, 's');
      this.setState({
        currentTime
      });
    }, 1000);
  }

  render() {
    return (
      <div>
        <p>This is a Index component.</p>
        <p>Current Date is {this.state.currentTime.format('YYYY-MM-DD HH:mm:ss')}</p>
        <div className="banner-img"></div>
      </div>
    );
  }
}

export default Index;
