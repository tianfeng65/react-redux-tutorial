import React from 'react'
import {connect} from 'react-redux'

/**
 * 这个 UI 组件有两个参数：value和onIncreaseClick。
 * 前者需要从state计算得到，后者需要向外发出 Action。
 */
function Counter (props) {
  return (
    <div>
      <span>{props.value}</span>
      <button onClick={props.onIncreaseClick}>Increase</button>
      <button onClick={props.onDecreaseClick}>Decrease</button>
      <button onClick={props.onResetClick}>Reset</button>
    </div>
  )
}

// 定义value到state的映射，
function mapStateToProps (state/*, ownProps*/) {
  return {
    value: state.count
  }
}

// 使用函数形式的mapDispatchToProps建立 UI 组件的参数到 store.dispatch方法的映射。
// function mapDispatchToProps (dispatch) {
//   return {
//     onIncreaseClick: () => dispatch({
//       type: 'increase'
//     }),
//     onDecreaseClick() {
//       dispatch({
//         type: 'decrease'
//       })
//     },
//     onResetClick() {
//       dispatch({
//         type: 'reset'
//       })
//     }
//   }
// }


// 使用对象形式的mapDispatchToProps建立 UI 组件的参数到 store.dispatch方法的映射。
const mapDispatchToProps = {
  onIncreaseClick: () => ({
      type: 'increase'
  }),
  onDecreaseClick() {
      return {type: 'decrease'}
  },
  onResetClick() {
      return {type: 'reset'}
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Counter)
