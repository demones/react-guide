import React, {Component} from 'react';

class ReduxExplain extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayStyle: 'none'
    };
  }

  toggleExplain() {
    this.setState({
      displayStyle: this.state.displayStyle === 'none' ? 'block' : 'none'
    });
  }

  render() {
    return (
      <div className="jumbotron jumbotron-fluid">
        <div className="container">
          <h1>技术分享 - React Redux 数据流</h1>
          <div>
            <a className="btn btn-link"
                    onClick={this.toggleExplain.bind(this)}>
              {this.state.displayStyle === 'none' ? '显示' : '隐藏'}
            </a>
          </div>
          <div style={{display: this.state.displayStyle}}>
            <h2>用 redux 处理数据流 代码书写步骤</h2>
            <ul>
              <li>把要实现的功能转化成 react 组件</li>
              <li>书写 Action，都有哪些操作</li>
              <li>根据 Action 定义的 type 用 Reducer 实现相关操作来更新 state</li>
              <li>通过 store 把 Action 和 Reducer 结合起来 <code>const store = createStore(rootReducer);</code></li>
              <li>
                利用 react-redux 中的方法 connect 重新包装组件
                <code>connect(mapStateToProps, mapDispatchToProps)(Component);</code>
              </li>
              <li>
                利用 Provider 把 store 传递给包装后的 Connect 组件
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default ReduxExplain;
