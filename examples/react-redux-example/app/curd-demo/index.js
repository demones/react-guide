import React from 'react';
import {render} from 'react-dom';
import Person from './components/Person';
import 'bootstrap/dist/css/bootstrap.css';
import './styles/index.css';

render((
  <Person />
), document.getElementById('layout'));
