import React from 'react';
import {Route} from 'react-router';
import App from '../containers/App';
import CurdPage from '../containers/CurdPage';
import TabsPage from '../containers/TabsPage';
import GithubPage from '../containers/GithubPage';
import GithubUserPage from '../containers/GithubUserPage';
import GithubRepoPage from '../containers/GithubRepoPage';

// 注意嵌套路由应该是相对路径，不能写成据对路径
export default (
  <Route path="/" component={App}>
    <Route path="curd" component={CurdPage}/>
    <Route path="tabs" component={TabsPage}/>
    <Route path="github" component={GithubPage}>
      <Route path=":login" component={GithubUserPage}/>
      <Route path=":login/:name" component={GithubRepoPage} />
    </Route>
  </Route>
);