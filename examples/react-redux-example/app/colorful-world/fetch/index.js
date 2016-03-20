import 'isomorphic-fetch';
import assign from 'lodash/assign';
import * as config from '../config';

const {URL_ROOT} = config;

// 定义 fetch 默认选项， 看 https://github.com/github/fetch
const defaultOptions = {
  method: 'get',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json; charset=utf-8'
  }
};
const successState = 'ok';

// 错误 code
const errorCode = {
  '0': '没有发送请求',
  '1': '后台返回数据出错',
  '401': '该请求不存在',
  '500': '服务器出错',
  '501': '格式不对',
  '503': '服务器拒绝，通常是跨域'
};

function checkStatus(response) {
  const status = response.status;
  if (status >= 200 && status < 300) {
    return response;
  }
  let error = new Error(response.statusText);
  error.response = response;
  error.errorCode = status;
  throw error;
}

/**
 * 封装 fetch
 * 根据业务需求，还可以在出错的地方处理相应的功能
 * @param url
 * @param options
 * @returns {Promise.<TResult>}
 */
function callApi(url, options) {
  if (!url) {
    let error = new Error('请传入 url');
    error.errorCode = 0;
    return Promise.reject(error);
  }

  // 当 url 放到 options 中
  if (typeof url === 'object') {
    options = url;
    url = options.url;
    delete options.url;
  }

  const fullUrl = (url.indexOf(URL_ROOT) === -1) ? URL_ROOT + url : url;
  let _options = {};
  if (options) {
    _options = assign({}, defaultOptions, options);
    const body = _options.body;
    if (body && typeof body === 'object') {
      _options.body = JSON.stringify(body);
    }
  }

  return fetch(fullUrl, _options)
    .then(checkStatus)
    .then(response =>
      response.json().then(json => ({json, response}))
    ).then(({json, response}) => {
      if (!response[successState]) {
        // 根据后台实际返回数据来定义错误格式
        let error = new Error(json.message || '获取数据出错');
        error.response = response;
        error.errorCode = 1;
        return Promise.reject(error);
      }

      return {json, response};
    }).catch((error) => {
      return Promise.reject(error);
    });
}

export default callApi;
