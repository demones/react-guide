import React, {Component} from 'react';
import {Jsx, Js, JsBuildIn} from 'components/JsxAndJsTransform';

class JsxAndJsTransformParent extends Component {
  render() {
    return (
      <div>
        <Jsx />
        <Js />
        <JsBuildIn />
      </div>
    );
  }
}

export default JsxAndJsTransformParent;
