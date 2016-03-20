import {combineReducers} from 'redux';
import {routerReducer as routing} from 'react-router-redux'
import persons from './persons';
import tabs from './tabs';
import * as github from './github';
import pagination from './pagination';

const {entities, errorMessage} = github;

// 注意这里，如果使用 react-router-redux，需要把 routerReducer 注入，否则会报错
// 对于每次 state 的改变，都会遍历所有的 reducer，然后根据条件执行对应的 reducer
export default combineReducers({
  persons,
  tabs,
  entities,
  pagination,
  errorMessage,
  routing
});

