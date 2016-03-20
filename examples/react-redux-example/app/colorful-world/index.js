import React from 'react';
import {render} from 'react-dom';
//import {hashHistory} from 'react-router';
import {useRouterHistory} from 'react-router';
import createHashHistory from 'history/lib/createHashHistory';
//import {createHashHistory} from 'history';
import {syncHistoryWithStore} from 'react-router-redux';
import Root from './containers/Root';
import configureStore from './store';
import 'bootstrap/dist/css/bootstrap.css';
import './styles/index.css';

// 去掉地址栏中的默认 queryKey
const hashHistory = useRouterHistory(createHashHistory)({
  queryKey: false
});

const store = configureStore();
const history = syncHistoryWithStore(hashHistory, store);

render(
  <Root store={store} history={history}/>,
  document.getElementById('layout')
);
