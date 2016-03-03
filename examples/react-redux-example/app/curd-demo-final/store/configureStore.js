import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import reducer from '../reducers';

/*function configureStore(initialState) {
  const store = createStore(reducer, initialState);
  return store;
}
export default configureStore;*/

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
