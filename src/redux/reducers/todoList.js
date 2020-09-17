const defaultTodoList = {
  todoList: []
}
export default function counter(state = defaultTodoList, action) {
  const {todoList} = state
  switch (action.type) {
    case 'addTodo': 
      return {
        todoList: [
          ...todoList, 
          {
            content: action.payload.content,
            id: action.payload.id,
            completed: false
          }
        ]
      }
    case 'toggleTodo': 
      const newTodoList = todoList.map(todo => todo.id === action.payload.id 
        ? {...todo, completed: !todo.completed}
        : todo
      )
      return {todoList: newTodoList}
    default: 
      return state
  }
}