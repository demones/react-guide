import React, {Component} from 'react';

class Index extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      examples: [
        {
          name: 'jsx 与 js 转换',
          link: 'jsxAndJsTransform.html'
        },
        {
          name: 'html 转义',
          link: 'htmlEscaped.html'
        },
        {
          name: '自定义 HTML 属性',
          link: 'customAttribute.html'
        }
      ]
    };
  }

  render() {
    return (
      <ol>
        {this.state.examples.map((item, index) => {
          return (
            <li key={`example_${index}`}><a href={item.link} target="_blank">{item.name}</a></li>
          );
        })}
      </ol>
    );
  }
}

export default Index;
