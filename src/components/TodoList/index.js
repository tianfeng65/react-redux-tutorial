import React from 'react'
import {connect} from 'react-redux'
import AddTodo from './AddTodo'
import Todo from './Todo'
import VisibilityFilter from './VisibilityFilter'
function TodoList ({todoList}) {
  return (
    <div>
      <AddTodo/>
      <ul>
        {todoList.length 
          ? todoList.map(todo => <Todo key={todo.id} todo={todo}></Todo>)
          : <li>No Todos, yay!</li>
        }
      </ul>
      <VisibilityFilter/>
    </div>
  )
}

function mapStateToProps (state) {
  return {
    todoList: filterTodoList(state.todoList.todoList,state.visibilityFilter.filter),
    filter: state.visibilityFilter.filter
  }
}

function filterTodoList(all, filter) {
  switch (filter) {
    case 'completed':
      return all.filter(todo => todo.completed)
    case 'inCompleted':
      return all.filter(todo => !todo.completed)
    default:
      return all
  }
}

export default connect(
  mapStateToProps
)(TodoList)