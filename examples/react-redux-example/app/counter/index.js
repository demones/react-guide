import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import App from './containers/App';
import configureStore from './store/configureStore';

/**
 * 返回结果为 object 对象
 dispatch: (action)
 getState: getState()
 replaceReducer: replaceReducer(nextReducer)
 subscribe: subscribe(listener)
 */
const store = configureStore();

/**
 *  Provider 来包装我们的 App 该组件内部会处理 store 让孩子组件可以使用 store
 *  内部是通过 react context 实现的
 *  context 中 利用以下代码，把 store 传给子组件中，context 的实现更像是全局变量，这样子组件就可以直接使用 store 了
 *  如果不用 context，则需要利用 props 一层一层的传下去，显然这里是不可取的
 *  Provider.childContextTypes = {
      store: storeShape.isRequired
    };

 Provider.prototype.getChildContext = function getChildContext() {
    return { store: this.store };
  };
 */
render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('layout')
);
