import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as Actions from '../actions';

import PersonList from '../components/PersonList';

/**
 * 创建的 reducer 时，利用 combineReducers 传入的对象，在调用 createStore 生成 store 时
 * 会生成与 combineReducers 传入的对象属性名一样的 state 对象，所以这里可以使用
 * 这也说明了 state 中存在的属性必须在 combineReducers 传入的对象先定义
 * @param state
 * @returns {{persons: *, filter: *}}
 */
function mapStateToProps(state) {
  return {
    persons: state.persons,
    filter: state.filter
  };
}

/**
 * 在 connect 创建的组件 Connect 中调用 mapDispatchToProps时，
 * 通过调用 bindActionCreators，在 mapValues 中处理，把所有的 actions 即本例中的 Actions
 * 转换成一个新的对象，对象中包含了所有的 actions，本例中格式如下
 {
   editPerson: function () {
     return dispatch(actionCreator.apply(undefined, arguments))
   }
   ...
 }
 当调用 editPerson(person) 时，会返回
 dispatch(actionCreator.apply(undefined, arguments))
 actionCreator 即为在 actions/index.js 中定义的方法，如下
 export function editPerson(person) {
    return {
      type: ActionTypes.EDIT_PERSON,
      person
    };
  }
  所以最终会执行dispatch，并把新的 state 返回
 dispatch({
      type: ActionTypes.EDIT_PERSON,
      person
 })
 在 dispatch 中会调用对应的 reducer，本例子为 reducers/persons.js 中的
 export default function personsReducer(state = initState, action) {}
 bindActionCreators(Actions, dispatch) 会转换成 actions 组成的对象集
 * @param dispatch
 * @returns {{actions: *}}
 */
function mapDispatchToProps(dispatch) {
  //return bindActionCreators(Actions, dispatch);
  return {
    actions: bindActionCreators(Actions, dispatch),
    dispatch //把 dispatch 暴露给 props，对于异步操作，如果想在 props 中使用 dispatch，我们需要设置一下
  };
}

// 如果不传入 mapDispatchToProps ，会用默认的函数
// const defaultMapDispatchToProps = dispatch => ({ dispatch })
// 默认的函数直接返回了 dispatch
export default connect(mapStateToProps, mapDispatchToProps)(PersonList);
