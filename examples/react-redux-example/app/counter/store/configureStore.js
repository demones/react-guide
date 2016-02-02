import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import reducer from '../reducers';

// 使用中间件来关联 store
const createStoreWithMiddleware = applyMiddleware(
  thunk
)(createStore);

// 简写版为，这里使用中间件 thunk
/**
 export default function configureStore(initialState) {
    return function () {
      createStore(reducer, initialState);
    }
 }
 */

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

