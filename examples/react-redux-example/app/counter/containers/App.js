import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Counter from '../components/Counter';
import * as CounterActions from '../actions/counter';

//把 state 中的值与 props 关联，这里名字名称可以不一致，但为了好维护，建议写成一样
//子组件就可以调用 this.props.counter 来显示其值了
function mapStateToProps(state) {
  return {
    counter: state.counter
  };
}

/**
 * 把 dispatch 和 action 绑定，然后通过 connect 把组件 Counter 跟 action 连接起来，这样
 * 组件就可以使用 action 中定义的行为了，最终是通过 props 来处理的
 * @param dispatch
 * @returns {*}
 */
function mapDispatchToProps(dispatch) {
  return bindActionCreators(CounterActions, dispatch);
}

/**
 * 包装 component ，注入 dispatch 和 state 到其默认的
 * connect(mapStateToProps, mapDispatchToProps)(Counter) 中；
 * 利用 connect 重新包装组件 Counter，内部实现比较复杂，主要是处理了 state props store 和 dispatch
 *
 * 内部首先创建 Connect 组件，该组件中处理了 mapStateToProps, mapDispatchToProps 等，把以下几个主要方法罗列以下
 * 1、computeStateProps(store, props) 会调用传入的 mapStateToProps 拿到返回的 state 值
 *
 * 2、function computeDispatchProps(store, props) 会处理 mapDispatchToProps，如没有传入，调用默认函数
 *
 * 3、内部用到的 store 会返回 Object 对象
     dispatch: (action) 调用当前的 reducer 把 当前的 state 和 aticon 转换为新的 state
     getState: getState() 返回当前的状态
     replaceReducer: replaceReducer(nextReducer) 用新的 reducer 替换当前的 reducer，并触发 dispatch
     subscribe: subscribe(listener) 添加新的订阅，即添加监听

     这个对象是通过 <Provider store={store}> 来传入的
     store 是通过调用 createStore(reducer, initialState) 来创建的

 * 4、computeMergedProps(stateProps, dispatchProps, parentProps) 合并不同的 props，主要包括 state 转换过来的（mapStateToProps）
     dispatch 和 父的 props，合成后会调用以下代码
     this.renderedElement = createElement(WrappedComponent,
     this.mergedProps
     )
     把 this.mergedProps 传递给包裹的 WrappedComponent组件（即 Counter）
     所以 Counter 中通过 this.props 拿到 dispatch

    5、trySubscribe()，该方法在 componentDidMount中调用，来处理监听的方法，主要是调用 this.setState()来改变组件状态

 * 最后又调用了 hoistStatics(Connect, WrappedComponent) 把 WrappedComponent 的一些公用属性值赋给 Connect 组件
 */
export default connect(mapStateToProps, mapDispatchToProps)(Counter);
