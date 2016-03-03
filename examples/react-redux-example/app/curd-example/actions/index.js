import * as ActionTypes from '../constants/ActionTypes';
const {SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE} = ActionTypes.VisibilityFilters;

/**
 * 在 Redux 中，action 主要用来传递操作 State 的信息，以 Javascript Plain Object 的形式存在，
 * 我们可以通过创建函数来生产 action，这类函数统称为 Action Creator。
 * 在 action 中 type 属性是必要的，除了 type 字段外，action 对象的结构可自己定义，建议尽可能简单，来处理 state
 * type 一般用来表达处理 state 数据的方式
 */
function addPerson(person) {
  return {
    type: ActionTypes.ADD_PERSON,
    person
  };
}

export function editPerson(person) {
  return {
    type: ActionTypes.EDIT_PERSON,
    person
  };
}

export function listPerson(persons) {
  return {
    type: ActionTypes.LIST_PERSON,
    persons
  };
}

export function deletePerson(id) {
  return {
    type: ActionTypes.DELETE_PERSON,
    id
  };
}

export function togglePerson(forbid) {
  return {
    type: ActionTypes.TOGGLE_PERSON,
    forbid
  };
}

export function filterSave(person) {
  return (dispatch, getState) => {
    const {forbid} = getState();
    if (forbid) {
      return;
    }
    dispatch(addPerson(person));
  };
}

// 过滤数据
export function changeStatus(id) {
  return {
    type: ActionTypes.CHANGE_STATUS,
    id
  };
}

export function showAll(status) {
  return {
    type: SHOW_ALL,
    status
  };
}

export function showComplete(status) {
  return {
    type: SHOW_COMPLETED,
    status
  };
}

export function showActive(status) {
  return {
    type: SHOW_ACTIVE,
    status
  };
}


// 异步请求实现

export function loadingPerson() {
  return (dispatch) => {
    setTimeout(() => {
      const persons = [{
        id: 0,
        firstName: '张',
        lastName: '三',
        completed: false
      }]
      dispatch(listPerson(persons));
    }, 1000);
  };
}

/*
 function requestPosts(reddit) {
 return {
 type: REQUEST_POSTS,
 reddit
 };
 }

 function receivePosts(reddit, json) {
 return {
 type: RECEIVE_POSTS,
 reddit,
 posts: json.data.children.map(child => child.data),
 receivedAt: Date.now()
 };
 }

 function fetchPosts(reddit) {
 return dispatch => {
 dispatch(requestPosts(reddit));
 return fetch(`https://www.reddit.com/r/${reddit}.json`)
 .then(response => response.json())
 .then(json => dispatch(receivePosts(reddit, json)));
 };
 }

 function shouldFetchPosts(state, reddit) {
 const posts = state.postsByReddit[reddit];
 if (!posts) {
 return true;
 }
 if (posts.isFetching) {
 return false;
 }
 return posts.didInvalidate;
 }

 export function fetchPostsIfNeeded(reddit) {
 return (dispatch, getState) => {
 if (shouldFetchPosts(getState(), reddit)) {
 return dispatch(fetchPosts(reddit));
 }
 };
 }*/
