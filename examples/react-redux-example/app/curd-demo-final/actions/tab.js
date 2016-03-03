import fetch from 'isomorphic-fetch';
import * as TabActionType from '../constants/TabActionType';

function fetchRequest(code) {
  return {
    type: TabActionType.FETCH_REQUEST,
    code
  };
}

function fetchReceive(code, json) {
  return {
    type: TabActionType.FETCH_RECEIVE,
    code,
    intro: json.success ? json.data.intro : ''
  }
}

export function fetchIntro(code) {
  return dispatch => {
    dispatch(fetchRequest(code));
    return fetch(`./curd-demo/json/${code}.json`)
      .then(response => response.json())
      .then(json => dispatch(fetchReceive(code, json)));
  };
}