import React from 'react'
import { connect } from 'react-redux'
// import {toggleTodo} from '../redux/actions'

function Todo (props) {
  return (
    <div>{props.todo}</div>
  )
}

export default connect()(Todo)