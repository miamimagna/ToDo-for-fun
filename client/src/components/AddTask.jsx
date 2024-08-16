import React, { useRef } from 'react'

const AddTask = ({setVisible, handleSubmit, taskValues, onChange}) => {
    
    const {title, desc} = taskValues;
    const overlayRef = useRef(null);
    const toggleVisibility = (e) => {
        setVisible(false);
    }

  return (
    <> 
    <div className='add-task-cont'>
      <p className='label'>Add a task.</p>
      <form onSubmit={handleSubmit}>
        <div className="task-title">
            <label htmlFor="title">Title</label>
            <input type="text" name='title' value={title} onChange={onChange} placeholder='title' minLength={2} required/>
        </div>
        <div className="task-desc">
            <label htmlFor="task-desc">Description</label>
            <input type="text" name='desc' value={desc} onChange={onChange} placeholder='description' />
        </div>
        <button type="submit" className='add-task-submit submit'>Add Task</button>
      </form>
    </div>
    <div className="overlay" ref = {overlayRef} onClick={toggleVisibility}></div>
    </>
  )
}

export default AddTask
