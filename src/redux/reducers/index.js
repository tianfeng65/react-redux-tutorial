import {combineReducers} from 'redux'
import counter from './counter'
import todoList from './todoList'

export default combineReducers({counter, todoList})