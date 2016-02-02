import React, {Component, PropTypes} from 'react';

// 定义 react 组件mapStateToProps
class Counter extends Component {
  render() {
    /**
     * this.props 中对应的属性是从 action 和 state 中获取的，见 App.js 中
     * mapStateToProps 和 mapDispatchToProps
     */
    const {increment, incrementIfOdd, incrementAsync, decrement, counter} = this.props;
    return (
      <p>
        Clicked: {counter} times
        {' '}
        <button onClick={increment}>+</button>
        {' '}
        <button onClick={decrement}>-</button>
        {' '}
        <button onClick={incrementIfOdd}>Increment if odd</button>
        {' '}
        <button onClick={() => incrementAsync()}>Increment async</button>
      </p>
    );
  }
}

Counter.propTypes = {
  increment: PropTypes.func.isRequired,
  incrementIfOdd: PropTypes.func.isRequired,
  incrementAsync: PropTypes.func.isRequired,
  decrement: PropTypes.func.isRequired,
  counter: PropTypes.number.isRequired
};

export default Counter;
