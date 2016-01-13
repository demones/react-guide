import React, {Component} from 'react';

class Piecemeal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInput: ''
    };
  }

  handleChange(e) {
    this.setState({userInput: e.target.value});
  }

  clearAndFocusInput() {
    this.setState({userInput: ''}, () => {
      console.info(`setState 是一个异步函数，如果想使用改变后的值，请在回调函数中处理${this.state.userInput}`);
      this.refs.theInput.focus();
    });
  }

  render() {
    return (
      <div>
        <p>setState 是一个异步函数，如果想使用改变后的值，请在回调函数中处理</p>
        <p>
          点击清空按钮清空输入框数据，并获取焦点，这里用到了 setState 回调函数
        </p>
        <p><button type="button" onClick={this.clearAndFocusInput.bind(this)}>清空</button></p>
        <input
          ref="theInput"
          value={this.state.userInput}
          onChange={this.handleChange.bind(this)}
        />
      </div>
    );
  }
}

export default Piecemeal;
