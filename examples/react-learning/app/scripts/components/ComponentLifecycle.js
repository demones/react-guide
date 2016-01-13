import React, {Component, PropTypes} from 'react';
import {findDOMNode} from 'react-dom';

let count = 0;

class ComponentLifecycle extends Component {

  /**
   * 在 es5 应该使用 object getInitialState() ，返回值将会作为 this.state 的初始值
   * 初始化每个实例的状态
   * @param props
   **/
  constructor(props) {
    super(props);
    this.state = {
      likeCount: count++,
      ready: false
    };
    console.info('getInitialState: 2');
  }

  /**
   * 服务器端和客户端都只调用一次，在初始化渲染执行之前立刻调用。
   * 如果在这个方法内调用 setState，render() 将会感知到更新后的 state，将会执行仅一次。
   * 该方法在 render 前提供一次修改 state 的机会
   */
  componentWillMount() {
    console.info('componentWillMount: 3');
    this.setState({ready: true});
  }

  /**
   * 在初始化渲染执行之后立刻调用一次，仅客户端有效（服务器端不会调用）。
   * 在生命周期中的这个时间点，可以通过 refs 或 DOM 来操作孩子节点。
   * componentDidMount()方法中，子组件在父组件之前被调用。
   * 如果想和其它 JavaScript 框架集成，使用 setTimeout 或者 setInterval 来设置定时器，
   * 或者发送 AJAX 请求，可以在该方法中执行这些操作。
   */
  componentDidMount() {
    console.info('componentDidMount: 5');
    const node = document.createElement('div');
    node.innerText = 'surprise! 在该生命周期内可以操作DOM';
    findDOMNode(this).appendChild(node);
  }

  /**
   * 在组件接收到新的 props 的时候调用。在初始化渲染的时候，该方法不会调用。
   * 此函数可以作为 react 在 prop 传入之后， render() 渲染之前更新 state。
   * 原先的 props 可以通过 this.props 来获取。在该函数中调用 this.setState() 将不会引起二次渲染。
   * @param nextProps
   */
  componentWillReceiveProps(nextProps) {
    console.info(nextProps);
    console.info('componentWillReceiveProps: 6');
  }

  /**
   * 在接收到新的 props 或者 state，将要渲染之前调用。该方法在初始化渲染的时候不会调用，
   * 在使用 forceUpdate 方法的时候也不会。如果确定新的 props 和 state 不会导致组件更新，则此处应该返回 false。
   * 如果 shouldComponentUpdate 返回 false，则 render() 将不会执行，直到下一次 state 改变。
   * 另外，componentWillUpdate 和 componentDidUpdate 也不会被调用。
   * 如果性能是个瓶颈，尤其是有几十个甚至上百个组件的时候，使用 shouldComponentUpdate 可以提升应用的性能。
   * @param nextProps
   * @param nextState
   */
  shouldComponentUpdate(nextProps, nextState) {
    console.info(nextProps);
    console.info(nextState);
    console.info('shouldComponentUpdate: 7');
    return true;
  }

  /**
   * 在接收到新的 props 或者 state 之前立刻调用。在初始化渲染的时候该方法不会被调用。
   * 可以使用该方法做一些更新之前的准备工作。
   * 不能在该方法中使用 this.setState()。如果需要更新 state 来响应某个 prop 的改变，
   * 请在 componentWillReceiveProps 中实现
   * @param nextProps
   * @param nextState
   */
  componentWillUpdate(nextProps, nextState) {
    console.info('componentWillUpdate: 8');
  }

  /**
   * 在组件的更新已经同步到 DOM 中之后被调用。该方法不会在初始化渲染的时候调用。
   * 使用该方法可以在组件更新之后操作 DOM 元素。
   * @param nextProps
   * @param nextState
   */
  componentDidUpdate(nextProps, nextState) {
    console.info('componentDidUpdate: 9');
    const node = document.createElement('div');
    node.innerText = 'surprise! 在该生命周期内可以操作DOM';
    findDOMNode(this).appendChild(node);
  }

  /**
   * 在组件从 DOM 中移除的时候立刻被调用。
   * 在该方法中执行任何必要的清理，比如无效的定时器，或者清除在 componentDidMount 中创建的 DOM 元素。
   */
  componentWillUnmount() {
    console.info('componentWillUnmount: 10');
  }

  /**
   * 只能访问 this.prop 和 this.state 不能修改 this.prop 和 this.state
   * 不允许修改状态和 DOM 输出
   * @returns {XML}
   */
  render() {
    console.info('render: 4');
    const state = this.state;
    return (
      <div>
        <h2>组件生命周期</h2>
        <p ref="childp">Hello, {this.props.name ? this.props.name : 'World'}</p>
        <p>{`${state.ready}`} , {state.likeCount}</p>
      </div>
    );
  }
}

// es5 写法需要定义 object getDefaultProps() ，返回的对象中的相应属性将会合并到 this.props中
// getDefaultProps() 只初始化一次，实例之间共享引用。是在创建组件的时候调用，而不是实例中调用
ComponentLifecycle.defaultProps = {
  initialCount: 0,
  name: 'Linder'
};
console.info('getDefaultProps: 1');

ComponentLifecycle.propTypes = {
  name: PropTypes.string.isRequired
};

export default ComponentLifecycle;
