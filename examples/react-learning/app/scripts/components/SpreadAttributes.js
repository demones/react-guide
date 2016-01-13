import React, {Component} from 'react';

class SpreadAttributes extends Component {
  render() {
    const explain = `
有时候你需要给组件设置多个属性，你不想一个个写下这些属性，或者有时候你甚至不知道这些属性的名称，
这时候 spread attributes 的功能就很有用了。
比如：

var props = {};
props.foo = x;
props.bar = y;
var component = <Component {...props} />;

props 对象的属性会被设置成 Component 的属性。

属性也可以被覆盖：

var props = { foo: 'default' };
var component = <Component {...props} foo={'override'} />;
console.log(component.props.foo); // 'override'

写在后面的属性值会覆盖前面的属性。

    `;
    return (
      <div>
        <pre>
          {explain}
          <div>更多信息可以参考官方 <a href="https://github.com/sebmarkbage/ecmascript-rest-spread" target="_blank">Object Rest
            and Spread Properties.</a></div>
        </pre>
      </div>
    );
  }
}

export default SpreadAttributes;
