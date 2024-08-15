import React from 'react'

const Content = ({title}) => {
  return (
    <main>
      <h1 id='greetings'>Hello {title}.</h1>
      <div id="todo-list">
        <div id="todo-header">
          <h2>Your Todos</h2>
          <button id='add-todo'>Add Todo</button>
        </div>
        <p>Nothing here, click Add Todo to add tasks</p>
      </div>
    </main>
  )
}

export default Content
