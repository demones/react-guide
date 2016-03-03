import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import reducer from '../reducers';

/**
 * 调用该函数后，返回的 store 结果为
 {
    dispatch, // dispatch 函数，调用当前 reducer 返回最新的 state
    subscribe, // 订阅-取消订阅函数
    getState, // 返回 state
    replaceReducer // 替换 reducer
 }
 */

// 简写版本
/*export default function configureStore(initialState) {
  const store = createStore(reducer, initialState);
  return store;
}*/

// 使用中间件来关联 store
const createStoreWithMiddleware = applyMiddleware(
  thunk
)(createStore);

// 这里使用中间件 thunk
export default function configureStore(initialState) {
  const store = createStoreWithMiddleware(reducer, initialState);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      /*eslint-disable global-require*/
      const nextReducer = require('../reducers');
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
