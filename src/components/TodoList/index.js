import React from 'react'
import {connect} from 'react-redux'
import AddTodo from './AddTodo'
import Todo from './Todo'
function TodoList ({todoList}) {
  return (
    <div>
      <AddTodo/>
      <ul>
        {todoList.length 
          ? todoList.map(todo => <Todo key={todo.id} todo={todo}></Todo>)
          : null
        }
      </ul>
    </div>
  )
}

function mapStateToProps (state) {
  return {
    todoList: state.todoList.todoList
  }
}

export default connect(
  mapStateToProps
)(TodoList)