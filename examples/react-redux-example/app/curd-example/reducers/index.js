import {combineReducers} from 'redux';

import personsReducer from './persons';
import filterReducer from './filter';
import forbidReducer from './forbid';

/**
 * combineReduceres 会返回一个函数 function combination(state = {}, action){}
 * 当调用 createStore 创建 store 时，会通过初始化调用 dispatch 方法，在 dispatch 方法中
 * 再调用 combination，遍历执行所有的 reducers，返回新的 state
 * 除了在初始化时调用，在调用 action 的时候也会调用 dispatch
 * 该例子中初始化时会返回形如以下 state 数据
  {
    persons: [{
      id: 0,
      firstName: '张',
      lastName: '三',
      completed: false
    }],
    filter: 'all',
    forbid: false
  }
 */
export default combineReducers({
  persons: personsReducer,
  filter: filterReducer,
  forbid: forbidReducer
});
