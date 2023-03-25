import React from 'react'

const Persons = ({filter, persons, copy, handleDelete}) => {
  return (
    <>
    {filter == '' ? persons.map(person => 
        <div key={person.id} style={{display: 'flex'}}>
          <p style={{marginRight: '10px'}}>{person.name}</p>
          <p>{person.number}</p>
          <button onClick={() => handleDelete(person.id, person.name)}>delete</button>
        </div>
    ) : copy.map(person => 
        <div key={person.id} style={{display: 'flex'}}>
          <p style={{marginRight: '10px'}}>{person.name}</p>
          <p>{person.number}</p>
          <button onClick={() => handleDelete(person.id, person.name)}>delete</button>
        </div>
    )}
    </>
  )
}

export default Persons