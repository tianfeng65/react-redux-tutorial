const defaultTodoList = {
  todoList: []
}
export default function counter(state = defaultTodoList, action) {
  const {todoList} = state
  switch (action.type) {
    case 'addTodo': 
      return {todoList: [...todoList, action.payload.content]}
    default: 
      return state
  }
}