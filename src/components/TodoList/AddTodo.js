import React, {useState} from 'react'
import {connect} from 'react-redux'

function AddTodo (props) {
  const [input, setInput] = useState('')
  return (
    <div>
      <input onChange={handleInput} value={input} type="text"/>
      <button onClick={handleAddTodo}>Add Todo</button>
    </div>
  )

  function handleInput (e) {
    setInput(e.target.value)
  }

  function handleAddTodo () {
    if(!input) return
    props.addTodo(input)
    setInput('')
  }
}

const mapDispatchToProps = {
  addTodo: input => ({
    type: 'addTodo',
    payload: {
      content: input
    }
  })
}

export default connect(
  null,
  mapDispatchToProps
)(AddTodo)