import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'

import store from './redux/store'
import Counter from './components/Counter'
import TodoList from './components/TodoList'

function App() {
  return (
    <div>
      <h1>Welcome</h1>
      
      <Router>
        <ul>
          <li>
            <Link to="/counter">go to counter</Link>
          </li>
          <li>
            <Link to="/todo-list">go to todo-list</Link>
          </li>
        </ul>

        <Route path="/counter" component={Counter}></Route>
        <Route path="/todo-list" component={TodoList}></Route>
      </Router>
    </div>
  )
}

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('root')
);

