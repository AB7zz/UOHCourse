import React from 'react'
import { useState } from 'react';

export default function Anton() {
  const[task,setTask] = useState([{}])
  const [cons,setCons] = useState('')

  const handleAdd = (e) => {
    e.preventDefault()
    setTask([...task,{id:Date.now(),status:false,text:cons}])
  }

  return (
    
    <div className="app">
      <div className="mainHeading">
        <h1>ToDo List</h1>
      </div>
      <div className="subHeading">
        <br />
        <h2>Whoop, it's Wednesday 🌝 ☕ </h2>
      </div>
      <div className="input">
        <input value={cons}
        onChange={(e)=>{setCons(e.target.value)}}
        placeholder="🖊️ Add item..." />
        <button 
        onClick={handleAdd}
        className="fas fa-plus">add</button>
      </div>
      {task && task.map(data => {
        const handleDelete = (id) => {
                    const newData = task.filter(t => t.id != id)
                    setTask(newData)
        }
        return(
                <div key={data.id}>
                          <p>{data.text}</p>
                            <button onClick={() => handleDelete(data.id)}>Delete this task</button>
                </div>
      )
      })}

    </div>
    
  )
}