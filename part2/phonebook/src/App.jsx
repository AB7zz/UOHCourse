import { useState, useEffect } from "react"
import Filter from "./components/Filter"
import PersonForm from "./components/PersonForm"
import Persons from "./components/Persons"
import functions from './services/persons'

function App() {
  const [persons, setPersons] = useState([]) 
  const [message, setMessage] = useState('')
  const [copy, setCopy] = useState([{}])
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    const fetchData = async() => {
      try{
        const res = await functions.getAll()
        setPersons(res)
      }catch(error){
        console.log('Error 1: ', error)
      }
    }
    fetchData()
  }, [])

  const setMessageNull = () => {
    setMessage(null)
  }

  const handleSubmit = async(e) => {
    try{
      e.preventDefault()
      const newPerson = {
        name: newName,
        number: newPhone
      }
      if(persons.some(person => person.name === newName)){
        const samePerson = persons.find(person => person.name == newName)
        if(window.confirm(`${newName} is already added to phonebook, do you want to update their phone number ?`)){
          functions.update(samePerson.id, newPerson)
            .then(res => {
              setPersons(persons.map(person => person.id != samePerson.id ? person : res))
              setMessage(`${samePerson.name}'s phone-number has been updated`)
            })
            .catch(error => {
              console.log('Error 4: ', error)
              setMessage(`Information of ${samePerson.name} has already been removed from server`)
            })
          setTimeout(() => {
            setMessageNull()
          }, 5000)
        }else{
          return
        }
      }else{
        const res = await functions.create(newPerson)
        
        setPersons([...persons, res])

        setMessage(`${newName} has been added to the list`)

        setTimeout(() => {
          setMessageNull()
        }, 5000)
      }
    }catch(error){
      console.log('Error 2: ', error)
    }
  }

  const handleFilter = (e) => {
    setFilter(e.target.value)
    const regex = new RegExp(filter, 'i')
    const filtered = persons.filter(person => person.name.match(regex))
    setCopy(filtered)
  }

  const handleDelete = async(id, name) => {
    try{
      if(window.confirm(`Are you sure you want to delete ${name} ? `)){
        const res = await functions.Delete(id)
        setPersons(persons.filter(person => person.id != id))
      }
    }catch(error){
      console.log('Error 3: ', error)
    }
  }
  const styles = {
    color: 'green'
  }
  return (
    <div>
      {message && <p style={styles}>{message}</p>}
      <h2>Phonebook</h2>
      <Filter handleFilter={handleFilter} />
      <h2>add a new</h2>
      <PersonForm setNewName={setNewName} setNewPhone={setNewPhone} handleSubmit={handleSubmit} />
      <h2>Numbers</h2>
      <Persons filter={filter} persons={persons} copy={copy} handleDelete={handleDelete} />
    </div>
  )
}

export default App
