import React, {Component} from 'react';

class PersonExplain extends Component {

  render() {
    return (
      <div className="jumbotron jumbotron-fluid">
        <div className="container">
          <h1>技术分享 - React Redux 数据流</h1>
          <ul>
            <li>通过一个简单的增删改查例子来介绍 redux 的用法</li>
            <li>通过切换标签来演示 redux 异步 Action 实现</li>
            <li>结合源码分析 redux 内部实现</li>
          </ul>
          <a href="http://v4-alpha.getbootstrap.com/" target="_blank">
            BootStrap 4
          </a>
        </div>
      </div>
    );
  }

}

export default PersonExplain;
