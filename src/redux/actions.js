export const addTodo = content => ({
  type: 'ADD_TODO',
  payload: {
    content
  }
})

export const toggleTodo = id => ({
  type: 'TOGGLE_TODO',
  payload: {
    id
  }
})

export const setFilter = filter => ({
  type: 'SET_FILTER',
  payload: {
    filter
  }
})