import React from 'react'
import {connect} from 'react-redux'
import AddTodo from './AddTodo'
import Todo from './Todo'
function TodoList (props) {
  const {todoList} = props
  return (
    <div>
      <AddTodo/>
      <ul>
        {todoList.length 
          ? todoList.map((todo,index) => <Todo key={index} todo={todo}></Todo>)
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