# React-Redux
***
```
React-Redux将所有组件分成两大类：__UI 组件__（presentational component）和 __容器组件__（container component）。
```
## 一、UI组件：

  1.只负责UI，不带有任何业务逻辑；    
  2.没有状态，即没有this.state；  
  3.所有的数据都由this.props提供；  
  4.不使用Redux的任何API。  
  ```javascript
  // UI组件
  const Title = (props) => (
    <h1>{props.title}</h1>
  )
  ```
## 二、容器组件

  1.负责管理数据和业务逻辑，不负责 UI 的呈现  
  2.带有内部状态   
  3.使用 Redux 的 API  
```
UI 组件负责 UI 的呈现，容器组件负责管理数据和逻辑。
如果一个组件既有 UI 又有业务逻辑，则将它拆分成下面的结构：外面是一个容器组件，里面包了一个UI 组件。前者负责与外部的通信，将数据传给后者，由后者渲染出视图。
React-Redux 规定，所有的 UI 组件都由用户提供，容器组件则是由 React-Redux 自动生成。也就是说，用户负责视觉层，状态管理则是全部交给它。
```
***

## 三、connect()
```
React-Redux 提供connect方法，用于从 UI 组件生成容器组件。connect的意思，就是将这两种组件连起来。
```
```javascript
import { connect } from 'react-redux'

const VisibleTodoList = connect()(TodoList);
```

上面代码中，TodoList是 UI 组件，VisibleTodoList就是由 React-Redux 通过connect方法自动生成的容器组件。

但是，因为没有定义业务逻辑，上面这个容器组件毫无意义，只是 UI 组件的一个单纯的包装层。为了定义业务逻辑，需要给出下面两方面的信息。

1.__输入逻辑__：外部的数据（即state对象）如何转换为 UI 组件的参数

2.__输出逻辑__：用户发出的动作如何变为 Action 对象，从 UI 组件传出去。

所以通常情况下的connect()会这么使用
```javascript
import { connect } from 'react-redux'

const VisibleTodoList = connect(
  mapStateToProps, // 负责输入逻辑，即将state映射到 UI 组件的参数（props）
  mapDispatchToProps // 负责输出逻辑，即将用户对 UI 组件的操作映射成 Action
)(TodoList)
```
***
## 四、mapStateToProps()
mapStateToProps是一个函数。它的作用就是像它的名字那样，建立一个从（外部的）state对象到（UI 组件的）props对象的映射关系。作为函数，mapStateToProps执行后应该返回一个对象，里面的每一个键值对就是一个映射。
```javascript
const mapStateToProps = (state) => {
  return {
    todos: getVisibleTodos(state.todos, state.visibilityFilter)
  }
}
// mapStateToProps是一个函数，它接受state作为参数，返回一个对象;
// 这个对象有一个todos属性，代表 UI 组件的同名参数;
// 后面的getVisibleTodos也是一个函数，可以从state算出 todos 的值。
const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case 'SHOW_ALL':
      return todos
    case 'SHOW_COMPLETED':
      return todos.filter(t => t.completed)
    case 'SHOW_ACTIVE':
      return todos.filter(t => !t.completed)
    default:
      throw new Error('Unknown filter: ' + filter)
  }
}
```
mapStateToProps会订阅 Store，每当state更新的时候，就会自动执行，重新计算 UI 组件的参数，从而触发 UI 组件的重新渲染。

mapStateToProps的第一个参数总是state对象，还可以使用第二个参数，代表容器组件的props对象。
```javascript
// 容器组件
<FilterLink filter="SHOW_ALL">
  All
</FilterLink>

const mapStateToProps = (state, ownProps) => {
  return {
    active: ownProps.filter === state.visibilityFilter
  }
}
// 使用ownProps作为参数后，如果容器组件的参数发生变化，也会引发 UI 组件重新渲染。
```
当然connect方法也可以省略mapStateToProps参数，那样的话，UI 组件就不会订阅Store，就是说 Store 的更新不会引起 UI 组件的更新。

## 五、mapDispatchToProps()
mapDispatchToProps是connect函数的第二个参数，用来建立 UI 组件的参数到store.dispatch方法的映射。也就是说，它定义了哪些用户的操作应该当作 Action，传给 Store。它可以是一个函数，也可以是一个对象。

* 如果mapDispatchToProps是一个函数，会得到dispatch和ownProps（容器组件的props对象）两个参数。返回一个对象，该对象的每个键值对都是一个映射，定义了 UI 组件的参数怎样发出 Action。
```javascript
const mapDispatchToProps = (
  dispatch,
  ownProps
) => {
  return {
    onClick: () => {
      dispatch({
        type: 'SET_VISIBILITY_FILTER',
        filter: ownProps.filter
      });
    }
  };
}
```
* 如果mapDispatchToProps是一个对象，它的每个键名也是对应 UI 组件的同名参数，键值应该是一个函数，会被当作 Action creator ，返回的 Action 会由 Redux 自动发出。举例来说，上面的mapDispatchToProps写成对象就是下面这样。
```javascript
const mapDispatchToProps = {
  onClick: (filter) => {
    type: 'SET_VISIBILITY_FILTER',
    filter: filter
  };
}
```

## 六、\<Provider>\</Provider>组件
connect方法生成容器组件以后，需要让容器组件拿到state对象，才能生成 UI 组件的参数。

一种解决方法是将state对象作为参数，传入容器组件。但是，这样做比较麻烦，尤其是容器组件可能在很深的层级，一级级将state传下去就很麻烦。

React-Redux 提供Provider组件，可以让容器组件拿到state。

```javascript
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import todoApp from './reducers'
import App from './components/App'

let store = createStore(todoApp);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
// 上面代码中，Provider在根组件外面包了一层，这样一来，App的所有子组件就默认都可以拿到state了。
```

## 七、例子：计数器
```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider, connect,} from 'react-redux'
import {createStore} from 'redux'
// reducer
function counter(state = {count: 0}, action) {
  const count = state.count
  switch (action.type) {
    case 'increase': 
      return {count: count+1}
    default: 
      return state
  }
}
// store
const store = createStore(counter)
/**
 * 这个 UI 组件有两个参数：value和onIncreaseClick。
 * 前者需要从state计算得到，后者需要向外发出 Action。
 */
function Counter (props) {
  return (
    <div>
      <span>{props.value}</span>
      <button onClick={props.onIncreaseClick}>Increase</button>
    </div>
  )
}

// 定义value到state的映射，
function mapStateToProps (state) {
  return {
    value: state.count
  }
}

// 定义onIncreaseClick到dispatch的映射。
function mapDispatchToProps (dispatch) {
  return {
    onIncreaseClick: () => dispatch({
      type: 'increase'
    })
  }
}

const App = connect(
  mapStateToProps,
  mapDispatchToProps
)(Counter)

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('root')
);


```







