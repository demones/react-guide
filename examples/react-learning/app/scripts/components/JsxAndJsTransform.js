import React, {Component} from 'react';

class Jsx extends Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    const code = `
    <div>
      <h2>jsx 语法</h2>
      <ul>
        <li>JSX 这种语法，就是为了把 HTML 模板直接嵌入到 JS 代码里面，这样就做到了模板和组件关联，
          但是 JS 不支持这种包含 HTML 的语法，所以需要通过工具将 JSX 编译输出成 JS 代码才能使用。
        </li>
      </ul>
    </div>`;
    return (
      <div>
        <h2>1. jsx 语法</h2>
        <ul>
          <li>JSX 这种语法，就是为了把 HTML 模板直接嵌入到 JS 代码里面，这样就做到了模板和组件关联，
            但是 JS 不支持这种包含 HTML 的语法，所以需要通过工具将 JSX 编译输出成 JS 代码才能使用。
          </li>
        </ul>
        <p>示例代码</p>
        <pre>
          {code}
        </pre>
      </div>
    );
  }
}

class Js extends Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    const code = `
    const title = React.createElement('h2', {key: 'title'}, 'js 对象写法');
    const child = React.createElement('li', null,
      '可以通过 React.createElement 来构造组件的 DOM 树。第一个参数是标签名，' +
      '第二个参数是属性对象，第三个参数是子元素。');
    const ul = React.createElement('ul', {className: 'my-list', key: 'ul'}, child);
    const codeTitle = React.createElement('p', {key: 'codeTitle'}, '示例代码');`;

    const title = React.createElement('h2', {key: 'title'}, '2. js 对象写法');
    const child = React.createElement('li', null,
      '可以通过 React.createElement 来构造组件的 DOM 树。第一个参数是标签名，' +
      '第二个参数是属性对象，第三个参数是子元素。');
    const ul = React.createElement('ul', {className: 'my-list', key: 'ul'}, child);
    const codeTitle = React.createElement('p', {key: 'codeTitle'}, '示例代码');
    const codeEl = React.createElement('pre', {key: 'code'}, code);
    const root = React.createElement('div', {className: 'my-list'}, [title, ul, codeTitle, codeEl]);
    return root;
  }
}

class JsBuildIn extends Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    const code = `
    const root = React.DOM.div(null,
      [React.DOM.h2({key: 'title'}, 'React 内置标签方法'),
        React.DOM.ul({key: 'ul', className: 'my-list'},
          React.DOM.li(null, '对于常见的 HTML 标签，React 已经内置了工厂方法')
        )
      ]
    );`;

    const root = React.DOM.div(null,
      [React.DOM.h2({key: 'title'}, '3. React 内置标签方法'),
        React.DOM.ul({key: 'ul', className: 'my-list'},
          React.DOM.li(null, '对于常见的 HTML 标签，React 已经内置了工厂方法')
        ),
        React.DOM.p({key: 'codeTitle'}, '示例代码'),
        React.DOM.pre({key: 'code'}, code)
      ]
    );

    return root;
  }
}

export  {Jsx, Js, JsBuildIn};

