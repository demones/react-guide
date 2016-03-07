import React, {Component} from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import '../../styles/animation.css';

class Animation extends Component {
  constructor(props, context) {
    super(props);
    this.state = {
      items: ['hello', 'world', 'click', 'me']
    };
  }

  handleAdd() {
    const newItems =
      this.state.items.concat([prompt('Enter some text')]);
    this.setState({items: newItems});
  }

  handleRemove(i) {
    const newItems = this.state.items.slice();
    newItems.splice(i, 1);
    this.setState({items: newItems});
  }

  render() {
    const items = this.state.items.map((item, i) => {
      return (
        <div key={item} onClick={this.handleRemove.bind(this, i)}>
          {item}
        </div>
      );
    });

    return (
      <div>
        <button onClick={this.handleAdd.bind(this)}>Add Item</button>
        <ReactCSSTransitionGroup transitionName="example" transitionEnterTimeout={500} transitionLeaveTimeout={300}>
          {items}
        </ReactCSSTransitionGroup>
      </div>
    );
  }
}

export default Animation;