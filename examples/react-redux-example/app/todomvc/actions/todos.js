import * as types from '../constants/ActionTypes';
//定义各种 action

/**
 * 添加 action
 * @param text
 * @returns {{type, text: *}}
 */
export function addTodo(text) {
  return {type: types.ADD_TODO, text};
}

/**
 * 根据 id 删除
 * @param id
 * @returns {{type, id: *}}
 */
export function deleteTodo(id) {
  return {type: types.DELETE_TODO, id};
}

/**
 * 修改
 * @param id
 * @param text
 * @returns {{type, id: *, text: *}}
 */
export function editTodo(id, text) {
  return {type: types.EDIT_TODO, id, text};
}

/**
 * 完成的
 * @param id
 * @returns {{type, id: *}}
 */
export function completeTodo(id) {
  return {type: types.COMPLETE_TODO, id};
}

/**
 * 显示所有完成的
 * @returns {{type}}
 */
export function completeAll() {
  return {type: types.COMPLETE_ALL};
}

/**
 * 清空已完成的
 * @returns {{type}}
 */
export function clearCompleted() {
  return {type: types.CLEAR_COMPLETED};
}
