import React, { PropTypes, Component } from 'react';
import TodoTextInput from './TodoTextInput';

class Header extends Component {
  handleSave(text) {
    if (text.length !== 0) {
      // 这里的 addTodo 是 App 传过来的，实际是从 action 拿到的，通过 mapDispatchToProps 把 action 和 dispatch
      // 关联起来，然后再通过 store 把 action 和 reducer 关联起来利用 Provider 传给 App.js，这样 App.js 就能拿到
      // 最终的 action 了，内部调用了 reducer，把值保持到 todos 中，App.js 就会重新 render
      this.props.addTodo(text);
    }
  }

  render() {
    return (
      <header className="header">
        <h1>todos</h1>
        <TodoTextInput newTodo
                       onSave={this.handleSave.bind(this)}
                       placeholder="What needs to be done?"/>
      </header>
    );
  }
}

Header.propTypes = {
  addTodo: PropTypes.func.isRequired
};

export default Header;
