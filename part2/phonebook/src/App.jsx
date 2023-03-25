import { useState, useEffect } from "react"
import Filter from "./components/Filter"
import PersonForm from "./components/PersonForm"
import Persons from "./components/Persons"
import axios from 'axios'

function App() {

  const [persons, setPersons] = useState([]) 
  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])
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
