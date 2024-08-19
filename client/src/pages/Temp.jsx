import React, { useState } from 'react'
import AddTask from '../components/AddTask';

const Temp = () => {
    const [visibility, setVisibility] = useState(true)
    
  return (
    <div className='canvas'>
      <button className='add-task' onClick={() => setVisibility(true)}>add task</button>
      {visibility && <AddTask setVisible={setVisibility}/>}
    </div>
  )
}

export default Temp
