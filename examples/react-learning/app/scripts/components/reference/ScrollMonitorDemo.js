import React from 'react';
import ScrollHack from './ScrollHack';

// https://github.com/browniefed/react-scroll-monitor
class ScrollMonitorDemo extends React.Component {
  render() {
    return (
      <div>
        <ScrollHack names={['1', '2', '3', '4']}/>
      </div>
    );
  }
}

export default ScrollMonitorDemo;