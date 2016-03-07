import React, {Component} from 'react';
import {Link, IndexLink} from 'react-router';

class List extends Component {
  render() {
    return (
      <div>
        <h1>react 相关知识点与实例</h1>
        <ul>
          <li><IndexLink to="/jsx" target="_blank">jsx 与 js 转换</IndexLink></li>
          <li><Link to="/htmlescaped" target="_blank">html 转义</Link></li>
          <li><Link to="/customattribute" target="_blank">自定义 HTML 属性</Link></li>
          <li><Link to="/spreadattributes" target="_blank">属性扩散</Link></li>
          <li><Link to="/different" target="_blank">JSX 与 HTML 的差异</Link></li>
          <li><Link to="/lifecycle" target="_blank">组件生命周期</Link></li>
          <li><Link to="/combination" target="_blank">组件组合</Link></li>
          <li><Link to="/communication" target="_blank">组件间通信</Link></li>
          <li><Link to="/form" target="_blank">表单操作</Link></li>
          <li><Link to="/animation" target="_blank">react 动画</Link></li>

          <li><Link to="/piecemeal" target="_blank">零碎知识点</Link></li>
        </ul>
      </div>
    );
  }
}

export default List;
