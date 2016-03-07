import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import reducer from '../reducers';

// 使用中间件来关联 store
const createStoreWithMiddleware = applyMiddleware(
  thunk
)(createStore);

// 这里使用中间件 thunk
export default function configureStore(initialState) {
  const store = createStoreWithMiddleware(reducer, initialState);
  return store;
}
