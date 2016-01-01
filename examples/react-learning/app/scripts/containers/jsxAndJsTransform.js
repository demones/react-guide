import React from 'react';
import {render} from 'react-dom';
import {Js, Jsx, JsBuildIn} from 'components/JsxAndJsTransform';
import 'styles/main.css';

render((
  <div>
    <Jsx/>
    <Js/>
    <JsBuildIn/>
  </div>
), document.getElementById('layout'));
