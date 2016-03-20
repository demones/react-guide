import React, {Component} from 'react';
import {Link} from 'react-router';

class DemoNav extends Component {
  render() {
    return (
      <div className="container m-b-2">
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <Link to="/curd" className="nav-link" activeClassName={'active'}>增删改查</Link>
          </li>
          <li className="nav-item">
            <Link to="/tabs" className="nav-link" activeClassName={'active'}>标签切换</Link>
          </li>
          <li className="nav-item">
            <Link to="/github" className="nav-link" activeClassName={'active'}>fetch 抓取数据</Link>
          </li>
        </ul>
      </div>
    );
  }
}

export default DemoNav;
