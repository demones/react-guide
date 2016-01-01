import React, {Component} from 'react';

class HtmlEscaped extends Component {
  render() {
    const copy = '&copy;';
    const escaped1 = `<span>{['cc ', <span>&copy;</span>, ' 2015']}</span>`;
    const escaped2 = `<span dangerouslySetInnerHTML={{__html: 'cc &copy; 2015'}} />`;
    return (
      <div>
        <h2>html 转义</h2>
        <p>React 会将所有要显示到 DOM 的字符串变量值（例如：{copy} 不会显示为 ©，而是 {copy}）转义，防止 XSS。
          所以如果 JSX 中变量含有转义后的实体字符比如 {copy} (©) 最后显示到 DOM 中不会正确显示，
          因为 React 自动把 {copy} 中的特殊字符转义了。有几种解决办法：</p>
        <ol>
          <li>不使用变量，直接在 JSX 中书写 &copy; ，仔细看，这里显示正确 </li>
          <li>使用数组组装， {escaped1} 显示的结果为：<span>{['cc ', <span>&copy;</span>, ' 2015']}</span></li>
          <li>直接插入原始的 HTML {escaped2}, 显示的结果为： <span dangerouslySetInnerHTML={{__html: 'cc &copy; 2015'}} /></li>
        </ol>
      </div>
    );
  }
}

export default HtmlEscaped;
