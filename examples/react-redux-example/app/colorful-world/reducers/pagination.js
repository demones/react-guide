import merge from 'lodash/merge'
import union from 'lodash/union'
import {combineReducers} from 'redux';
import * as GithubActionType from '../constants/GithubActionType';

const {
  STARRED_REQUEST, STARRED_SUCCESS, STARRED_FAILURE,
  STARGAZERS_REQUEST, STARGAZERS_SUCCESS, STARGAZERS_FAILURE
} = GithubActionType;

/*eslint-disable indent*/
/**
 * 分页抽象函数
 * 创建 reducer 来管理 github api 数据，并给出根据不同的 action 来处理不同的 handle
 * 外层包裹了一层函数，用来处理根据不同的 type 匹配不同的  reducer
 * @param types
 * @param mapActionToKey
 * @returns {updatePaginationByKey}
 */
function paginate({types, mapActionToKey}) {
  // 首先检测传入的数据类型是否正确
  if (!Array.isArray(types) || types.length !== 3) {
    throw new Error('types 应该是一个数组，并且包含三个对象。');
  }
  if (!types.every(t => typeof t === 'string')) {
    throw new Error('数组中每个 type 应该是一个 string 类型。');
  }
  if (typeof mapActionToKey !== 'function') {
    throw new Error('mapActionToKey 应该是一个函数。');
  }

  const [ requestType, successType, failureType ] = types;

  // 更新分页数据
  function updatePagination(state = {
    isFetching: false,
    nextPageUrl: undefined,
    pageCount: 0,
    ids: []
  }, action) {
    switch (action.type) {
      case requestType:
        return merge({}, state, {
          isFetching: true
        });
      case successType:
        return merge({}, state, {
          isFetching: false,
          ids: union(state.ids, action.response.result),
          nextPageUrl: action.response.nextPageUrl,
          pageCount: state.pageCount + 1
        });
      case failureType:
        return merge({}, state, {
          isFetching: false
        });
      default:
        return state;
    }
  }

  // 根据不同的 key （可能是 github 用户或 github 仓库）
  return function updatePaginationByKey(state = {}, action) {
    switch (action.type) {
      case requestType:
      case successType:
      case failureType:
      {
        const key = mapActionToKey(action);
        if (typeof key !== 'string') {
          throw new Error('key 必须是一个字符串类型');
        }
        return merge({}, state, {
          [key]: updatePagination(state[key], action)
        });
      }
      default:
        return state;
    }
  };
}

const pagination = combineReducers({
  starredByUser: paginate({
    mapActionToKey: action => action.login,
    types: [
      STARRED_REQUEST,
      STARRED_SUCCESS,
      STARRED_FAILURE
    ]
  }),
  stargazersByRepo: paginate({
    mapActionToKey: action => action.fullName,
    types: [
      STARGAZERS_REQUEST,
      STARGAZERS_SUCCESS,
      STARGAZERS_FAILURE
    ]
  })
});

export default pagination;