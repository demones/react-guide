import React from 'react';
import {render} from 'react-dom';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
//import {createHashHistory} from 'history';

import HopeFuture from 'components/HopeFuture';
import Index from 'components/Index';
import JsxAndJsTransformParent from 'components/JsxAndJsTransformParent';
import HtmlEscaped from 'components/HtmlEscaped';
import CustomAttribute from 'components/CustomAttribute';
import SpreadAttributes from 'components/SpreadAttributes';
import Different from 'components/Different';
import ComponentLifecycleContainer from 'components/ComponentLifecycleContainer';
import Piecemeal from 'components/Piecemeal';
import Combination from 'components/Combination';
import Communication from 'components/Communication';
import Form from 'components/Form';
import Animation from 'components/Animation';

import 'styles/main.css';

/*const history = createHashHistory({
  queryKey: false
});*/

render((
  <div>
    <Router history={browserHistory}>
      <Route path="/" component={HopeFuture}>
        <IndexRoute component={Index}/>
        <Route path="/jsx" component={JsxAndJsTransformParent}/>
        <Route path="/htmlescaped" component={HtmlEscaped}/>
        <Route path="/customattribute" component={CustomAttribute}/>
        <Route path="/spreadattributes" component={SpreadAttributes}/>
        <Route path="/different" component={Different}/>
        <Route path="/lifecycle" component={ComponentLifecycleContainer}/>
        <Route path="/piecemeal" component={Piecemeal}/>
        <Route path="/combination" component={Combination}/>
        <Route path="/communication" component={Communication}/>
        <Route path="/form" component={Form}/>
        <Route path="/animation" component={Animation}/>
      </Route>
    </Router>
  </div>

), document.getElementById('layout'));


