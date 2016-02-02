import {combineReducers} from 'redux';
import counter from './counter';

/**
 * 绑定多个 reducer
 * 当触发 action 后（会在 App.js 触发），combineReducers 返回的 rootReducer 会负责调用 reducer，生成新的 state
 * 本例子中为
 * let newState = counter(state.counter, action); newState 是自己起的变量值，实际上是对应 reducer 返回值
 * 然后会把结果集合并成一个 state 树：
 return {
   counter: newState
 };
 * 注意这里的 counter 是 state 值，App.js 中引用的 state.counter 即使这里设置的
  function mapStateToProps(state) {
    return {
      counter: state.counter
    };
  }
 */
const rootReducer = combineReducers({
  counter
});

export default rootReducer;
