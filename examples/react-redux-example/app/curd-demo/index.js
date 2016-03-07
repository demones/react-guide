import {Provider} from 'react-redux';
import React from 'react';
import {render} from 'react-dom';
import App from './containers/App';
import configStore from './store';
import 'bootstrap/dist/css/bootstrap.css';
import './styles/index.css';

const store = configStore();
render((
  <Provider store={store}>
    <App/>
    
  </Provider>
), document.getElementById('layout'));
