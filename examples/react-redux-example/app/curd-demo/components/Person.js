import React, {Component} from 'react';

class Person extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div className="jumbotron jumbotron-fluid">
          <div className="container">
            <h1>技术分享 - React Redux 数据流</h1>
            <ul>
              <li>通过一个简单的增删改查例子来介绍 redux 的用法</li>
              <li>通过切换标签来演示 redux 异步 Action 实现</li>
              <li>结合源码分析 redux 内部实现</li>
            </ul>
            <a href="http://v4-alpha.getbootstrap.com/" target="_blank">
              BootStrap 4
            </a>
          </div>
        </div>

        <div className="container">
          <h3 className="m-b-2">增删改查</h3>
          <form className="form-inline">
            <div className="form-group">
              <label>First Name</label>
              <input type="text" className="form-control" placeholder="First Name"/>
            </div>
            <div className="form-group">
              <label>Last Name</label>
              <input type="text" className="form-control" placeholder="Last Name"/>
            </div>
            <button type="button" className="btn btn-info">Save</button>
          </form>
          <hr/>
          <table className="table">
            <thead className="thead-inverse">
            <tr>
              <th>#</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Username</th>
              <th></th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <th>1</th>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
              <td className="link-group">
                <a>编辑</a>
                <a>取消</a>
                <a>保存</a>
                <a>删除</a>
              </td>
            </tr>
            </tbody>
          </table>
        </div>

        <div className="container">
          <h3 className="m-b-2 m-t-3">切换标签</h3>
          <ul className="nav nav-tabs">
            <li className="nav-item">
              <a className="nav-link active" href="">北京</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="">河北</a>
            </li>
          </ul>

          <div className="tab-content m-t-1">
            <div className="tab-pane active" >北京 loading</div>
            <div className="tab-pane">河北 loading</div>
          </div>
        </div>
      </div>
    );
  }
}

export default Person;
