import React, {Component} from 'react';

class CustomAttribute extends Component {
  render() {
    return (
      <div>
        <h2>html 转义</h2>
        <p>如果在 JSX 中使用的属性不存在于 HTML 的规范中，这个属性会被忽略。如果要使用自定义属性，可以用 data- 前缀。</p>
        <p>可访问性属性的前缀 aria- 也是支持的。</p>
        <p><a target="_blank" href="http://facebook.github.io/react/docs/tags-and-attributes.html">支持的标签和属性请看官方说明</a></p>
      </div>
    );
  }
}

export default CustomAttribute;
