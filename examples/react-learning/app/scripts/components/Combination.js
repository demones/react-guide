import React, {Component} from 'react';

// 无状态组件，能用尽量使用无状态组件，提高性能
/*eslint-disable react/prop-types*/
const ProfilePic = (props) => {
  return (
    <img src={`http://graph.facebook.com/${props.username}/picture`}/>
  );
};

const ProfileLink = (props) => {
  return (
    <a href={`http://www.facebook.com/${props.username}`}>
      {props.username}
    </a>
  );
};

const Avatar = (props) => {
  return (
    <div>
      <ProfilePic username={props.username}/>
      <ProfileLink username={props.username}/>
    </div>
  );
};


// 有状态组件，父子间传值
class ListItemWrapper extends Component {

  handlerClick() {
    this.props.print(this.props.data.text);
  }

  render() {
    return (
      <li onClick={this.handlerClick.bind(this)}>{this.props.data.text}</li>
    );
  }
}

class List extends Component {

  print(text) {
    console.info(text);
  }

  render() {
    return (
      <div>
        <h3>这里用到了子组件向父组件传递数据的方法，利用 props 委托</h3>
        <ul>
          {this.props.results.map((result) => {
            return <ListItemWrapper key={result.id} data={result} print={this.print.bind(this)}/>;
          })}
        </ul>
      </div>
    );
  }
}

class Combination extends Component {
  render() {
    let results = [{
      id: 1,
      text: '列表1'
    },
      {
        id: 2,
        text: '列表2'
      }];

    return (
      <div>
        <h2>组件组合</h2>
        <Avatar username="pwh"/>
        <List results={results}/>
      </div>
    );
  }
}

export default Combination;
