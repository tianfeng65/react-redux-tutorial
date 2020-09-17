const defaultState = {
  count: 0,
}
export default function counter(state = defaultState, action) {
  const {count} = state
  switch (action.type) {
    case 'increase': 
      return {count: count+1}
    case 'decrease': 
      return {count: count-1}
    case 'reset': 
      return {count: 0}
    default: 
      return state
  }
}