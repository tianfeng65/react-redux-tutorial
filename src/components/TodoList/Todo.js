import React from 'react'
import { connect } from 'react-redux'
import cx from "classnames"
import '../../style.css'



function Todo ({todo, toggleTodo}) {
  return (
    <li className="todo" onClick={() => toggleTodo(todo.id)}>
      <span className="todo-status">{todo.completed ? '👌' : '👏'}</span>
      <span className={cx("todo-content", todo.completed ? "todo-content-completed" : "")}>{todo.content}</span>
    </li>
  )
}

const mapActionsToProps = {
  toggleTodo(id) {
    return {
      type: 'toggleTodo',
      payload: {
        id
      }
    }
  }
}
export default connect(
  null,
  mapActionsToProps
)(Todo)