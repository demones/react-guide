import React, {Component, PropTypes} from 'react';
import {findDOMNode} from 'react-dom';

// 在 react 0.14 中对于可遍历的 Object 对象，需要用 createFragment 包装一下，或者直接使用array
// 用法可以参考 http://www.oschina.net/news/66873/react-0-14 中说明
import createFragment from 'react-addons-create-fragment';

/*eslint-disable react/no-multi-comp*/

// 不可控组件 1
class UncontrollableForm1 extends Component {
  render() {
    return (
      <div>
        <h3>1. 不可控组件 1</h3>
        <input type="text" defaultValue="Hello World!"/>
      </div>
    );
  }
}

// 不可控组件 2
class UncontrollableForm2 extends Component {
  submitHandler(event) {
    event.preventDefault();
    const helloTo = findDOMNode(this.refs.helloTo).value;
    console.info(helloTo);
  }

  render() {
    return (
      <div>
        <h3>2. 不可控组件 2</h3>
        <form onSubmit={this.submitHandler.bind(this)}>
          <input ref="helloTo" type="text" defaultValue="Hello World!"/>
          <br /> <br />
          <button type="submit">Speak</button>
        </form>
      </div>
    );
  }
}

// 可控组件 1
class ControllableForm1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      helloTo: 'Hello World!'
    };
  }

  handleChange(event) {
    this.setState({
      helloTo: event.target.value
    });
  }

  submitHandler(event) {
    event.preventDefault();
    console.info(this.state.helloTo);
  }

  render() {
    return (
      <div>
        <h3>3. 可控组件 1</h3>
        <form onSubmit={this.submitHandler.bind(this)}>
          <input type="text" value={this.state.helloTo} onChange={this.handleChange.bind(this)}/>
          <br /> <br />
          <button type="submit">Speak</button>
        </form>
      </div>
    );
  }
}

// 表单元素的使用
class FormElement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      gender: 'man',
      checked: true
    };
  }

  handleUsernameChange(event) {
    this.setState({
      username: event.target.value
    });
  }

  handleGenderChange(event) {
    this.setState({
      gender: event.target.value
    });
  }

  handleCheckboxChange(event) {
    this.setState({
      checked: event.target.checked
    });
  }

  submitHandler(event) {
    event.preventDefault();
    console.log(this.state);
  }

  render() {
    return (
      <div>
        <h3>4. 表单元素的使用</h3>
        <form onSubmit={this.submitHandler.bind(this)}>
          <label htmlFor="username">请输入用户名:</label>
          <input id="username" type="text" value={this.state.username}
                 onChange={this.handleUsernameChange.bind(this)}/>
          <br /><br />
          <label htmlFor="gender">性别:</label>
          <select id="gender" value={this.state.gender} onChange={this.handleGenderChange.bind(this)}>
            <option value="man">男</option>
            <option value="woman">女</option>
          </select>
          <br /><br />
          <label htmlFor="checkbox">同意用户协议</label>
          <input id="checkbox" type="checkbox" checked={this.state.checked}
                 onChange={this.handleCheckboxChange.bind(this)}/>
          <button type="submit">注册</button>
        </form>
      </div>
    );
  }
}

// 通过表单元素 name 复用事件
class FormReuseEventByName extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      gender: 'man',
      checked: true
    };
  }

  handleChange(event) {
    let newState = {};
    newState[event.target.name] = event.target.name === 'checked' ? event.target.checked : event.target.value;
    this.setState(newState);
  }

  submitHandler(event) {
    event.preventDefault();
    console.log(this.state);
  }

  render() {
    return (
      <div>
        <h3>5. 通过表单元素 name 复用事件</h3>
        <form onSubmit={this.submitHandler.bind(this)}>
          <label htmlFor="username">请输入用户名:</label>
          <input name="username" id="username" type="text" value={this.state.username}
                 onChange={this.handleChange.bind(this)}/>
          <br /><br />
          <label htmlFor="gender">性别:</label>
          <select id="gender" name="gender" value={this.state.gender} onChange={this.handleChange.bind(this)}>
            <option value="man">男</option>
            <option value="woman">女</option>
          </select>
          <br /><br />
          <label htmlFor="checkbox">同意用户协议</label>
          <input id="checkbox" name="checked" type="checkbox" checked={this.state.checked}
                 onChange={this.handleChange.bind(this)}/>
          <button type="submit">注册</button>
        </form>
      </div>
    );
  }
}

// 通过 bind 复用表单事件
class FormReuseEventByBind extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      gender: 'man',
      checked: true
    };
  }

  handleChange(name, event) {
    let newState = {};
    newState[name] = name === 'checked' ? event.target.checked : event.target.value;
    this.setState(newState);
  }

  submitHandler(event) {
    event.preventDefault();
    console.log(this.state);
  }

  render() {
    return (
      <div>
        <h3>6. 通过 bind 复用表单事件</h3>
        <form onSubmit={this.submitHandler.bind(this)}>
          <label htmlFor="username">请输入用户名:</label>
          <input id="username" type="text" value={this.state.username}
                 onChange={this.handleChange.bind(this, 'username')}/>
          <br /> <br />
          <label htmlFor="gender">性别:</label>
          <select id="gender" value={this.state.gender} onChange={this.handleChange.bind(this, 'gender')}>
            <option value="man">男</option>
            <option value="woman">女</option>
          </select>
          <br /> <br />
          <label htmlFor="checkbox">同意用户协议</label>
          <input id="checkbox" type="checkbox" checked={this.state.checked}
                 onChange={this.handleChange.bind(this, 'checked')}/>
          <button type="submit">注册</button>
        </form>
      </div>
    );
  }
}

// 不可控自定义Radio组件
class UncontrollableCustomRadio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.defaultValue
    };
  }

  handleChange(event) {
    if (this.props.onChange) {
      this.props.onChange(event);
    }
    this.setState({
      value: event.target.value
    });
  }

  render() {
    let children = {};
    let value = this.props.value || this.state.value;
    React.Children.forEach(this.props.children, (child, i) => {
      const label = (
        <label>
          <input type="radio" name={this.props.name} value={child.props.value} checked={child.props.value === value}
                 onChange={this.handleChange.bind(this)}/>
          {child.props.children}
          <br/>
        </label>
      );
      children[`label${i}`] = label;
    });
    return <span>{createFragment(children)}</span>;
  }
}

UncontrollableCustomRadio.propTypes = {
  defaultValue: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.string,
  name: PropTypes.string,
  children: PropTypes.array
};

// 不可控自定义表单组件
class UncontrollableCustomForm extends Component {
  submitHandler(event) {
    event.preventDefault();
    console.info(this.refs.radio.state.value);
  }

  render() {
    return (
      <div>
        <h3>7. 不可控自定义表单组件，不建议使用，应该使用可控自定义表单组件</h3>
        <form onSubmit={this.submitHandler.bind(this)}>
          <UncontrollableCustomRadio ref="radio" name="my_radio" defaultValue="B">
            <option value="A">First Option</option>
            <option value="B">Second Option</option>
            <option value="C">Third Option</option>
          </UncontrollableCustomRadio>
          <button type="submit">Speak</button>
        </form>
      </div>
    );
  }
}

// 可控自定义Radio组件
class ControllableCustomRadio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.defaultValue
    };
  }

  handleChange(event) {
    if (this.props.onChange) {
      this.props.onChange(event);
    }
    this.setState({
      value: event.target.value
    });
  }

  render() {
    let children = {};
    const value = this.props.value || this.state.value;
    React.Children.forEach(this.props.children, (child, i) => {
      const label = (
        <label>
          <input type="radio" name={this.props.name} value={child.props.value} checked={child.props.value === value}
                 onChange={this.handleChange.bind(this)}/>
          {child.props.children}
          <br/>
        </label>
      );
      children[`label${i}`] = label;
    });
    return <span>{createFragment(children)}</span>;
  }
}

ControllableCustomRadio.propTypes = {
  defaultValue: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.string,
  name: PropTypes.string,
  children: PropTypes.array
};

// 可控自定义表单组件
class ControllableCustomForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      radioValue: 'B'
    };
  }

  handleChange(event) {
    this.setState({
      radioValue: event.target.value
    });
  }

  submitHandler(event) {
    event.preventDefault();
    console.info(this.state.radioValue);
  }

  render() {
    return (
      <div>
        <h3>8. 可控自定义表单组件</h3>
        <form onSubmit={this.submitHandler.bind(this)}>
          <ControllableCustomRadio name="myRadio" value={this.state.radioValue} onChange={this.handleChange.bind(this)}>
            <option value="A">First Option</option>
            <option value="B">Second Option</option>
            <option value="C">Third Option</option>
          </ControllableCustomRadio>
          <button type="submit">Speak</button>
        </form>
      </div>
    );
  }
}

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      password: '',
      gender: ''
    };
  }

  render() {
    return (
      <div>
        <UncontrollableForm1 />
        <UncontrollableForm2 />
        <ControllableForm1 />
        <FormElement />
        <FormReuseEventByName />
        <FormReuseEventByBind />
        <UncontrollableCustomForm />
        <ControllableCustomForm />
      </div>
    );
  }
}

export default Form;
