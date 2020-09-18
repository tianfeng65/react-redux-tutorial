# 初识React-Redux
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

__使用指南__

- 使用mapStateToProps重塑来自Store的数据

mapStateToProps函数可以而且应该做的不仅仅是返回state.someSlice。它们负责根据组件的需要“重塑”store数据。这可能包括返回一个值作为特定的prop名称，组合来自状态树不同部分的数据片段，以及以不同的方式转换store数据。

- 使用选择器函数来提取和转换数据

我们强烈鼓励使用“选择器”功能来帮助封装从状态树中特定位置提取值的过程。记忆化的选择器功能在提高应用程序性能方面也起着关键作用。

- mapStateToProps函数应该是快速的


每当存储更改时，所有连接组件的所有mapStateToProps函数都将运行。因此，你的mapStateToProps函数应该尽可能快地运行。这也意味着缓慢的mapStateToProps函数可能成为应用程序性能的潜在瓶颈。
作为“重塑数据”思想的一部分，mapStateToProps函数经常需要以各种方式转换数据(例如过滤数组、将id数组映射到对应的对象、或从不变JS对象中提取纯JS值)。无论是执行转换的成本，还是组件是否重新呈现结果，这些转换通常都是昂贵的。如果关注性能，请确保只有在输入值发生更改时才运行这些转换。

- mapStateToProps函数应该是纯同步的

与Redux reducer类似，mapStateToProps函数应该始终是100%纯且同步的。它应该只接受状态(和ownProps)作为参数，并返回组件所需的数据作为参数，而不改变这些参数。不应该使用它来触发像AJAX调用那样的异步行为来获取数据，并且不应该将函数声明为异步。

__细节和技巧__

- 返回值决定组件是否重新呈现

React Redux在内部实现了shouldComponentUpdate方法，以便包装器组件在组件所需的数据发生更改时准确地重新呈现。默认情况下，React Redux使用===比较（“浅相等性”检查）在返回对象的每个字段上确定从mapStateToProps返回的对象的内容是否不同。如果任何字段已更改，则将重新渲染您的组件，以便它可以将更新的值作为prop接收。__请注意，返回具有相同引用的变异对象是一个常见错误，它可能导致组件在预期时无法重新呈现。__ 

例如在TodoList实例中，每次dispatch都对store中的todoList进行了引用替换，在改变todo的完成状态时，也对该todo进行了引用替换，不然都不会触发re-render。

- 只在需要时返回新对象引用

React Redux进行了浅层比较，以查看mapStateToProps结果是否已更改。每次很容易意外返回新的对象或数组引用，即使数据实际上相同，这也会导致您的组件重新呈现。

以下是许多常见的创建新的对象或数组引用的操作：

  - 使用someArray.map（）或someArray.filter（）创建新数组
  - 使用array.concat合并数组
  - 使用array.slice截取数组的一部分
  - 用Object.assign复制对象
  - 使用扩展运算符{... oldState，... newData}复制

__行为和陷阱__

- 如果存储状态相同，则mapStateToProps将不会运行

由connect生成的包装器组件订阅Redux存储。每次dispatch action时，它都会调用store.getState（）并检查 __lastState === currentState__。如果两个状态值通过引用相同，则它将不会重新运行mapStateToProps函数，因为它假定其余存储状态均未更改。所以在TodoList实例中，每次都将todoList进行了拆箱装箱处理，以确保它的引用发生了改变，从而触发re-render。

- 声明的参数数量影响行为

使用just（state），只要根存储状态对象不同，该函数就会运行。使用（state，ownProps），它可以在存储状态不同的任何时候运行，并且在包装器属性发生更改时也可以运行。这意味着除非您实际需要使用它，否则不应该添加ownProps参数，否则您的mapStateToProps函数将比其所需的运行时间更多。

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
  onClick: (filter) => ({
    type: 'SET_VISIBILITY_FILTER',
    filter: filter
  });
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
git clone
npm i
npm run start
访问：http://localhost:3000/counter

## 八、例子：TodoList
git clone
npm i
npm run start
访问：http://localhost:3000/todo-list





