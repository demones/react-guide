/**
 * 定义 action
 */

export const INCREMENT_COUNTER = 'INCREMENT_COUNTER';
export const DECREMENT_COUNTER = 'DECREMENT_COUNTER';

// 增加 action
export function increment() {
  return {
    type: INCREMENT_COUNTER
  };
}

// 减少 action
export function decrement() {
  return {
    type: DECREMENT_COUNTER
  };
}

// 如果是奇数 则增加
export function incrementIfOdd() {
  return (dispatch, getState) => {
    const {counter} = getState();

    if (counter % 2 === 0) {
      return;
    }

    dispatch(increment());
  };
}

// 异步操作
export function incrementAsync(delay = 1000) {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(increment());
    }, delay);
  };
}
