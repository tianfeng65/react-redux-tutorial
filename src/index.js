import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import {createStore} from 'redux'
import Counter from './Counter'

// reducer
function counter(state = {count: 0}, action) {
  const count = state.count
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
// store
const store = createStore(counter)

ReactDOM.render(
  <Provider store={store}>
    <Counter/>
  </Provider>,
  document.getElementById('root')
);

