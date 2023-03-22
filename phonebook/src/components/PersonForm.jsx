import React from 'react'

const PersonForm = ({setNewName, setNewPhone, handleSubmit}) => {
  return (
    <form>
        <div>
          name: <input onChange={e => setNewName(e.target.value)} />
          number: <input onChange={e => setNewPhone(e.target.value)} />
        </div>
        <div>
          <button onClick={handleSubmit} type="submit">add</button>
        </div>
    </form>
  )
}

export default PersonForm