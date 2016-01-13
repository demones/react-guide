import React, {Component, PropTypes} from 'react';

/**
 * 子组件向父组件通信
 * 首先父组件向子组件传递了一个 prop handleSelect 函数
 * 子组件值改变时，调用this.props.handleSelect，相当于间接调用父组件的函数
 */
class GenderSelect extends Component {

  render() {
    return (
      <select onChange={this.props.handleSelect}>
        <option value="0">男</option>
        <option value="1">女</option>
      </select>
    );
  }
}

GenderSelect.propTypes = {
  handleSelect: PropTypes.func
};


class Communication extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      password: '',
      gender: ''
    };
  }

  handleChange(name, event) {
    let newState = {};
    newState[name] = event.target.value;
    this.setState(newState);
  }


  handleSelect(event) {
    this.setState({gender: event.target.value});
  }


  render() {
    console.log(this.state);
    return (
      <div>
        <p>父子组件见的通信，该例子只演示了，子组件怎么向父组件通信</p>
        <form>
          <p>
            <input type="text" placeholder="请输入用户名" onChange={this.handleChange.bind(this, 'name')}/>
          </p>
          <p>
            <input type="password" placeholder="请输入密码" onChange={this.handleChange.bind(this, 'password')}/>
          </p>
          <p>
            <GenderSelect handleSelect={this.handleSelect.bind(this)} />
          </p>
        </form>
      </div>
    );
  }
}

export default Communication;
