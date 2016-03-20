import * as GithubActionType from '../constants/GithubActionType';
import {CALL_API} from '../middleware/api';
import {GithubSchemas} from '../models/GithubSchemas';

// 加载 Github 账户
const {USER_REQUEST, USER_SUCCESS, USER_FAILURE} = GithubActionType;

/**
 * 通过调用 fetch 来发送异步请求
 * action 应该返回的是包含 type 属性的对象
 * 这里之所以可以，是因为我们采用了中间件 ./middleware/api.js
 * @param login
 * @returns 
 */
function fetchUser(login) {
  return {
    [CALL_API]: {
      types: [USER_REQUEST, USER_SUCCESS, USER_FAILURE],
      url: `users/${login}`,
      schema: GithubSchemas.USER
    }
  };
}

/**
 * 从 Github 抓取用户数据，如果之前获取过则或略
 * 利用了中间件 Thunk
 * @param login
 * @param requiredFields
 * @returns {function()}
 */
export function loadUser(login, requiredFields = []) {
  return (dispatch, getState) => {
    const user = getState().entities.users[login];
    if (user && requiredFields.every(key => user.hasOwnProperty(key))) {
      return null;
    }

    return dispatch(fetchUser(login));
  };
}


// 加载 Github 账户
const {REPO_REQUEST, REPO_SUCCESS, REPO_FAILURE} = GithubActionType;

// Fetches a single repository from Github API.
// Relies on the custom API middleware defined in ../middleware/api.js.
function fetchRepo(fullName) {
  return {
    [CALL_API]: {
      types: [REPO_REQUEST, REPO_SUCCESS, REPO_FAILURE],
      url: `repos/${fullName}`,
      schema: GithubSchemas.REPO
    }
  };
}

// Fetches a single repository from Github API unless it is cached.
// Relies on Redux Thunk middleware.
export function loadRepo(fullName, requiredFields = []) {
  return (dispatch, getState) => {
    const repo = getState().entities.repos[fullName];
    if (repo && requiredFields.every(key => repo.hasOwnProperty(key))) {
      return null;
    }

    return dispatch(fetchRepo(fullName));
  };
}


// 加载 Github 账户
const {STARGAZERS_REQUEST, STARGAZERS_SUCCESS, STARGAZERS_FAILURE} = GithubActionType;

// Fetches a page of stargazers for a particular repo.
// Relies on the custom API middleware defined in ../middleware/api.js.
function fetchStargazers(fullName, nextPageUrl) {
  return {
    fullName,
    [CALL_API]: {
      types: [STARGAZERS_REQUEST, STARGAZERS_SUCCESS, STARGAZERS_FAILURE],
      url: nextPageUrl,
      schema: GithubSchemas.USER_ARRAY
    }
  };
}

// Fetches a page of stargazers for a particular repo.
// Bails out if page is cached and user didn’t specifically request next page.
// Relies on Redux Thunk middleware.
export function loadStargazers(fullName, nextPage) {
  return (dispatch, getState) => {
    const {
      nextPageUrl = `repos/${fullName}/stargazers`,
      pageCount = 0
    } = getState().pagination.stargazersByRepo[fullName] || {};

    if (pageCount > 0 && !nextPage) {
      return null;
    }

    return dispatch(fetchStargazers(fullName, nextPageUrl));
  };
}


// 获取 github 仓库，包括自己的和关注别人的仓库
const {STARRED_REQUEST, STARRED_SUCCESS, STARRED_FAILURE} = GithubActionType;

function fetchStarred(login, nextPageUrl) {
  return {
    login,
    [CALL_API]: {
      types: [STARRED_REQUEST, STARRED_SUCCESS, STARRED_FAILURE],
      url: nextPageUrl,
      schema: GithubSchemas.REPO_ARRAY
    }
  };
}

/**
 * 获取 github 仓库，包括自己的和关注别人的仓库
 * @param login
 * @param nextPageUrl
 * @returns {{login: *}}
 */
export function loadStarred(login, nextPage) {
  return (dispatch, getState) => {
    //官方默认显示100条，这里为了演示效果，设置为10条
    const {
      nextPageUrl = `users/${login}/starred?per_page=10`,
      pageCount = 0
    } = getState().pagination.starredByUser[login] || {};

    if (pageCount > 0 && !nextPage) {
      return null;
    }

    return dispatch(fetchStarred(login, nextPageUrl));
  };
}

const {RESET_ERROR_MESSAGE} = GithubActionType;

// Resets the currently visible error message.
export function resetErrorMessage() {
  return {
    type: RESET_ERROR_MESSAGE
  };
}