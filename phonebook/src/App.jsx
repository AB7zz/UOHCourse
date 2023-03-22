import { useState } from "react"
import Anton from "./Antont"
import Filter from "./components/Filter"
import PersonForm from "./components/PersonForm"
import Persons from "./components/Persons"

function App() {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [copy, setCopy] = useState([{}])

  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [filter, setFilter] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if(persons.some(person => person.name === newName)){
      window.alert(`${newName} is already added to phonebook`)
      return
    } 
    setPersons(prev => [...prev, {name: newName, number: newPhone}])
  }

  const handleFilter = (e) => {
    setFilter(e.target.value)
    const regex = new RegExp(filter, 'i')
    const filtered = persons.filter(person => person.name.match(regex))
    setCopy(filtered)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleFilter={handleFilter} />
      <h2>add a new</h2>
      <PersonForm setNewName={setNewName} setNewPhone={setNewPhone} handleSubmit={handleSubmit} />
      <h2>Numbers</h2>
      <Persons filter={filter} persons={persons} copy={copy} />
    </div>
  )
}

export default App
