import {INCREMENT_COUNTER, DECREMENT_COUNTER} from '../actions/counter';

// 定义 reducer 为不同的 action 处理不同的行为，并返回新的 state 值，这里可以设置默认值
export default function counter(state = 0, action) {
  /*eslint-disable indent*/
  switch (action.type) {
    case INCREMENT_COUNTER:
      return state + 1;
    case DECREMENT_COUNTER:
      return state - 1;
    default:
      return state;
  }
}
