import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css';

class PersonComponent extends Component {

  render() {
    return (
      <div>
        <div className="jumbotron jumbotron-fluid">
          <div className="container">
            <h1>React Redux 分享</h1>
            <div>React 数据流 redux 介绍</div>
            <div>
              <button type="button" className="btn btn-link">隐藏</button>
            </div>
            <div>
              <p>
                Redux 思想、实现机制与核心方法等
              </p>
              <ul>
                <li>Redux 主要分为三个部分 Action、Reducer、及 Store</li>
                <li></li>
                <li></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="container">
          <form className="form-inline">
            <div className="form-group">
              <label>First Name</label>
              <input type="text" className="form-control"/>
            </div>
            <div className="form-group">
              <label>Last Name</label>
              <input type="text" className="form-control"/>
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
            </tr>
            </thead>
            <tbody>
            <tr>
              <th scope="row">1</th>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default PersonComponent;
