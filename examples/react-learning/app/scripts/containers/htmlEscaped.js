import React from 'react';
import {render} from 'react-dom';
import HtmlEscaped from 'components/HtmlEscaped';
import 'styles/main.css';

render((
  <div>
    <HtmlEscaped/>
  </div>
), document.getElementById('layout'));
