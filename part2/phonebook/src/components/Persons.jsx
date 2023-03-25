import React from 'react'

const Persons = ({filter, persons, copy}) => {
  return (
    <>
    {filter == '' ? persons.map(person => 
        <div key={person.name} style={{display: 'flex'}}>
          <p style={{marginRight: '10px'}}>{person.name}</p>
          <p>{person.number}</p>
        </div>
    ) : copy.map(person => 
        <div key={person.name} style={{display: 'flex'}}>
          <p style={{marginRight: '10px'}}>{person.name}</p>
          <p>{person.number}</p>
        </div>
    )}
    </>
  )
}

export default Persons