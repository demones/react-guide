import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import App from './containers/App';
import configureStore from './store/configureStore';
import 'bootstrap/dist/css/bootstrap.css';
import './styles/index.css';

const store = configureStore();

render((
  <Provider store={store}>
    <App/>
  </Provider>
), document.getElementById('layout'));
