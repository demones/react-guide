import React, {Component, PropTypes} from 'react';
import {useRouterHistory} from 'react-router';
import createHashHistory from 'history/lib/createHashHistory';

// 去掉地址栏中的默认 queryKey
const hashHistory = useRouterHistory(createHashHistory)({
  queryKey: false
});

class Github extends Component {
  constructor(props) {
    super(props);
    // 在构造函数中绑定，只需绑定一次
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleDismissClick = this.handleDismissClick.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.inputValue !== this.props.inputValue) {
      this.setInputValue(nextProps.inputValue);
    }
  }

  getInputValue() {
    return this.refs.input.value;
  }

  setInputValue(val) {
    this.refs.input.value = val;
  }

  handleKeyUp(e) {
    if (e.keyCode === 13) {
      this.handleClick();
    }
  }

  handleClick() {
    const {githubPath} = this.props;
    const nextValue = this.getInputValue();
    const {inputValue} = this.props;
    if (nextValue !== inputValue) {
      hashHistory.push(`/${githubPath}/${nextValue}`);
    }
  }

  handleDismissClick() {
    this.props.resetErrorMessage();
  }

  renderErrorMessage() {
    const {errorMessage} = this.props;
    if (!errorMessage) {
      return null;
    }

    return (
      <div className="row">
        <div className="col-md-6 alert alert-danger fade in">
          <button type="button" className="close" onClick={this.handleDismissClick}>
            <span>&times;</span>
          </button>
          <strong>错误信息：{errorMessage}</strong>
        </div>
      </div>
    );
  }

  render() {
    const {children, inputValue, githubPath} = this.props;
    // 这里 children 可能为空，所以需要判断一下
    const finalChildren = children ? React.cloneElement(children, {
      githubPath
    }) : children;

    //把父路由中值传给子路由，githubPath 会传给子路由，当然在子路由中可以直接根据路由拿到该值，这里只是演示父子路由之间的传值
    return (
      <div className="container">
        <h4>请输入一个 github 账户或仓库名</h4>
        <form className="form-inline">
          <div className="form-group">
            <input type="text" className="form-control" placeholder="Github 账户或仓库"
                   ref="input" defaultValue={inputValue} onKeyUp={this.handleKeyUp}/>
          </div>
          <button type="button" className="btn btn-primary" onClick={this.handleClick}>抓取数据</button>
        </form>
        <hr/>
        <p>通过按快捷键 Ctrl+W 来调整 DevTools 显示的位置或者按 Ctrl+H 来显示或隐藏 DevTools</p>
        <hr/>
        {this.renderErrorMessage()}
        {finalChildren}
      </div>
    );
  }
}

Github.propTypes = {
  children: PropTypes.node,
  githubPath: PropTypes.string,
  inputValue: PropTypes.string,
  errorMessage: PropTypes.string,
  resetErrorMessage: PropTypes.func.isRequired
};
export default Github;
