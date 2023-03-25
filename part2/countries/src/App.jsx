import { useEffect, useState } from "react"
import functions from './services/countries'
import Country from "./components/Country"

function App() {
  const [country, setCountry] = useState()
  const [countries, setCountries] = useState()
  const [message, setMessage] = useState(null)
  useEffect(() => {
    const fetchCountries = async() => {
      try{
        const res = await functions.getAll()
        console.log(res)
        setCountries(res)
      }catch(error){
        console.log('Error 1: ', error)
      }
    }
    fetchCountries()
  }, [])

  const handleFilter = async(e) => {
    try{
      const res = await functions.getCountry(e.target.value)
      if(res.length > 10){
        setMessage('Too many matches, specify another filter')
      }else{
        console.log(res)
        setCountry(res)
        setMessage(null)
      }
    }catch(error){
      console.log('Error 2: ', error)
    }

  }

  const handleCountry = country => {
    setCountry([country])
  }

  return (
    <div>
      <p>find countries <input onChange={handleFilter} /></p>
      {message && <p>{message}</p>}
      {country && country.map(c => (
        <div style={{display: 'flex'}}>
          <p>{c.name.common}</p>
          <button onClick={() => handleCountry(c)}>Show</button>
        </div>
      ))}
      <Country country={country} />
    </div>
  )
}

export default App
