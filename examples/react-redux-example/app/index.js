import React, {Component} from 'react';
import {render} from 'react-dom';

class Index extends Component {
  render() {
    const lists = [{
      title: '官方例子 Counter',
      url: './counter.html'
    }, {
      title: '官方例子 Redux TodoMVC example',
      url: './todomvc.html'
    }, {
      title: '官方例子 Redux todos with undo example',
      url: './todoswithundo.html'
    }, {
      title: '官方例子 Redux async example',
      url: './async.html'
    }, {
      title: '官方例子 基于服务器端 react redux An example of a universally-rendered Redux application，需要运行 npm start',
      url: 'http://localhost:3000'
    }, {
      title: '官方例子 Redux real-world example',
      url: './realworld.html'
    }, {
      title: '官方例子 Redux shopping cart example',
      url: './shoppingcart.html'
    }];

    return (
      <ol style={{margin: '30px auto', width: '80%'}}>
        {lists.map((item, index) =>
          <li key={index}><p><a href={item.url}>{item.title}</a></p></li>
        )}
      </ol>
    );
  }
}

render((
  <Index/>
), document.getElementById('layout'));

