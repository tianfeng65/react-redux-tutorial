import {combineReducers} from 'redux'
import counter from './counter'
import todoList from './todoList'
import visibilityFilter from './visibilityFilter'

export default combineReducers({counter, todoList, visibilityFilter})