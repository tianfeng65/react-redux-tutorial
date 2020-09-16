import React from 'react';
import ReactDOM from 'react-dom';
import {Provider, connect,} from 'react-redux'
import {createStore} from 'redux'
// reducer
function counter(state = {count: 0}, action) {
  const count = state.count
  switch (action.type) {
    case 'increase': 
      return {count: count+1}
    default: 
      return state
  }
}
// store
const store = createStore(counter)
/**
 * 这个 UI 组件有两个参数：value和onIncreaseClick。
 * 前者需要从state计算得到，后者需要向外发出 Action。
 */
function Counter (props) {
  return (
    <div>
      <span>{props.value}</span>
      <button onClick={props.onIncreaseClick}>Increase</button>
    </div>
  )
}

// 定义value到state的映射，
function mapStateToProps (state) {
  return {
    value: state.count
  }
}

// 定义onIncreaseClick到dispatch的映射。
function mapDispatchToProps (dispatch) {
  return {
    onIncreaseClick: () => dispatch({
      type: 'increase'
    })
  }
}

const App = connect(
  mapStateToProps,
  mapDispatchToProps
)(Counter)

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('root')
);

