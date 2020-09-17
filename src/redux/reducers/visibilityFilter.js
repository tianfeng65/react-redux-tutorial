const defaultFilter = {
  filter: 'all'
}

export default function visibilityFilter(state = defaultFilter, action) {
  switch (action.type) {
    case 'toggleFilter':
      return {filter: action.payload.filter}
    default:
      return state
  }
}