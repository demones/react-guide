import React, {Component} from 'react';

class Different extends Component {
  /*eslint-disable quotes*/
  render() {
    return (
      <div>
        <h2>JSX 与 HTML 的差异</h2>
        <div>
          <p>
            JSX 与 HTML 的不同主要有以下差异：
          </p>
          <ol>
            <li>所有的属性应该采用驼峰式，但 data-* and aria-* 应该用小写</li>
            <li>class 要写成 className， for 应该写成 htmlFor</li>
            <li>style 属性接受由 CSS 属性（驼峰）构成的 JS 对象</li>
            <li>注册的事件应该写成驼峰式，比如：onMouseUp 等</li>
            <li>onChange 事件表现更接近我们的直觉（不需要 onBlur 去触发），类似于input事件</li>
            <li>表单的表现差异</li>
          </ol>
          <p>表单的差异性</p>
          <ol>
            <li><a href="http://facebook.github.io/react/docs/events.html#form-events">表单事件</a></li>
            <li>
              受限组件，用value设置其初始值，并通过onChange事件来监听来改变其值，看下面的例子
              <pre>
               {
  `getInitialState: function() {
    return {value: 'Hello!'};
  },
  handleChange: function(event) {
    this.setState({value: event.target.value});
  },
  render: function() {
    var value = this.state.value;
    return <input type="text" value={value} onChange={this.handleChange} />;
  }`
                 }
              </pre>
            </li>
            <li>
              不受限制组件，用defaultValue来设置其初始值，并且这个值用户可以改变并会反应到界面上
            </li>
            <li>
              {`类型为 radio、checkbox 的<input> 支持 defaultChecked 属性， <select> 支持 defaultValue 属性`}
              <pre>
                {`
    render: function() {
      return (
          <div>
            <input type="radio" name="opt" defaultChecked /> Option 1
            <input type="radio" name="opt" /> Option 2
            <select defaultValue="C">
              <option value="A">Apple</option>
              <option value="B">Banana</option>
              <option value="C">Cranberry</option>
            </select>
          </div>
      );
    }
                `}
              </pre>
            </li>

          </ol>
          <p>更多异同，可以参见官方 <a href="http://facebook.github.io/react/docs/dom-differences.html">DOM Differences</a></p>
        </div>
      </div>
    );
  }
}

export default Different;
