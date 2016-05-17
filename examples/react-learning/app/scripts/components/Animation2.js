import React, {Component} from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import '../../styles/animation.css';

class Animation2 extends Component {
  constructor(props, context) {
    super(props);
    this.state = {
      items: ['hello', 'world', 'click', 'me'],
      items1: ['hello', 'world', 'click', 'me'],
      items2: ['transform', 'animation', 'transition', 'donghua'],
      tab: 1,
      tab2: 1
    };
  }

  switchList() {
    const tab = this.state.tab;
    this.setState({tab: tab === 1 ? 2 : 1});
  }

  switchList2() {
    const tab2 = this.state.tab2;
    this.setState({tab2: tab2 === 1 ? 2 : 1});
  }

  render() {
    const {tab, tab2, items, items1, items2} = this.state;
    return (
      <div>
        <h3>对于动画切换,必须两个对象的 key 不一样,否则是不会切换的,原来如此</h3>
        <h4 style={{color: '#ff00dd'}}>
          如果想让 ReactCSSTransitionGroup 产生动画效果,
          则 ReactCSSTransitionGroup 包含的子元素 key 不能相同,包含的子元素最好是列表的父节点,
          如果包含的是所有子节点,则可能会有性能问题
        </h4>
        <button type="button" onClick={this.switchList.bind(this)}>切换</button>
        <ReactCSSTransitionGroup transitionName="example" transitionEnterTimeout={500} transitionLeaveTimeout={300}>
          {
            tab === 1 ?
              items1.map((item, i) => {
                return (
                  <div key={item}>
                    {item}
                  </div>
                );
              }) :
              items2.map((item, i) => {
                return (
                  <div key={item}>
                    {item}
                  </div>
                );
              })
          }
        </ReactCSSTransitionGroup>

        <h3>同一个对象,遍历时 key 值不一样也可以触发动画</h3>
        <button type="button" onClick={this.switchList2.bind(this)}>切换</button>

        <ReactCSSTransitionGroup transitionName="example" transitionEnterTimeout={500} transitionLeaveTimeout={300}>
          {
            tab2 === 1 ?
              items.map((item, i) => {
                return (
                  <div key={item + 1}>
                    <span style={{color: '#ff00dd'}}>{item}</span>
                  </div>
                );
              }) :
              items.map((item, i) => {
                return (
                  <div key={item + 2}>
                    {item}
                  </div>
                );
              })
          }
        </ReactCSSTransitionGroup>
      </div>
    );
  }
}

export default Animation2;