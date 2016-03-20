import React, {Component} from 'react';

class Explain extends Component {
  render() {
    return (
      <div className="jumbotron">
        <div className="container">
          <h1> react redux 与 router 实例</h1>
          <ul>
            <li>下面例子基于 router 来切换</li>
            <li>通过一个简单的增删改查例子来介绍 redux 的用法</li>
            <li>通过切换标签来演示 redux 异步 Action 实现</li>
            <li>通过抓取 github 上数据来演示 fetch 以及数据缓存
              <a href="https://github.com/reactjs/redux/tree/master/examples/real-world" target="_blank">（参考官方例子）</a>
            </li>
          </ul>
          <a href="http://v4-alpha.getbootstrap.com/" target="_blank">
            BootStrap 4
          </a>
        </div>
      </div>
    );
  }
}

export default Explain;
