// JSON 数据范式化
import {normalize} from 'normalizr';
// 驼峰命名和下划线命名之间转换
import {camelizeKeys} from 'humps';
import assign from 'lodash/assign';
import 'isomorphic-fetch';
import callApi from '../fetch';

// Extracts the next page URL from Github API response.
// 看官方 https://developer.github.com/v3/#pagination
// github 分页实现，是写在 response.headers link 中的
function getNextPageUrl(response) {
  const link = response.headers.get('link');
  if (!link) {
    return null;
  }

  // 数组 find 方法表示找到第一个符合条件的元素
  /**
   Link: <https://api.github.com/user/repos?page=3&per_page=100>; rel="next",
   <https://api.github.com/user/repos?page=50&per_page=100>; rel="last"
   */
  const nextLink = link.split(',').find(s => s.indexOf('rel="next"') > -1);
  if (!nextLink) {
    return null;
  }

  return nextLink.split(';')[0].slice(1, -1);
}

// Action key that carries API call info interpreted by this Redux middleware.
// 看阮老师的博客 http://es6.ruanyifeng.com/#docs/symbol
// 用 Symbol 来标示独一无二的属性值
export const CALL_API = Symbol('Call API');

// A Redux middleware that interprets actions with CALL_API info specified.
// Performs the call and promises when such actions are dispatched.
export default store => next => action => {
  /**
   * callAPI 值类似以下
   * {
      types: [USER_REQUEST, USER_SUCCESS, USER_FAILURE],
      url: `users/${login}`,
      schema: GithubSchemas.USER
    }
   */
  const callAPI = action[CALL_API];
  if (typeof callAPI === 'undefined') {
    return next(action);
  }

  let {url} = callAPI;
  const {schema, types} = callAPI;

  if (typeof url === 'function') {
    url = url(store.getState());
  }

  if (typeof url !== 'string') {
    throw new Error('Specify a string endpoint URL.');
  }
  if (!schema) {
    throw new Error('Specify one of the exported Schemas.');
  }
  if (!Array.isArray(types) || types.length !== 3) {
    throw new Error('Expected an array of three action types.');
  }
  if (!types.every(type => typeof type === 'string')) {
    throw new Error('Expected action types to be strings.');
  }

  // 分别执行发送请求，成功或失败请求
  function actionWith(data) {
    // 注意这里，返回最终的 action 供 reducer 中使用，即 reducer 中拿到的 action 是从这里取到的
    const finalAction = assign({}, action, data);
    delete finalAction[CALL_API];
    return finalAction;
  }

  const [ requestType, successType, failureType ] = types;

  // 先发送请求
  next(actionWith({type: requestType}));


  // Fetches an API response and normalizes the result JSON according to schema.
  // This makes every API response have the same shape, regardless of how nested it was.
  return callApi(url, schema).then(
    ({json, response}) => {
      //把对象或数组转换为驼峰式
      const camelizedJson = camelizeKeys(json);
      const nextPageUrl = getNextPageUrl(response);
      const _response = assign({},
        normalize(camelizedJson, schema),
        {nextPageUrl}
      );

      return next(actionWith({
        response: _response,
        type: successType
      }));
    },
    error => next(actionWith({
      type: failureType,
      error: error.message || 'Something bad happened'
    }))
  );
};
