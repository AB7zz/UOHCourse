import React from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react'
// import dotenv from 'dotenv'

// dotenv.config()

const Country = ({country}) => {
  const [weather, setWeather] = useState()
  useEffect(() => {
    const fetchWeather = async() => {
      try{
        const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${country[0].capital[0]}&appid=19916d05fe7f5e83e3e996564ed5e05b`)
        console.log(res)
        setWeather(res)
      }catch(error){
        console.log('Error 5: ', error)
      }
    }
    fetchWeather()
  }, [country])
  return (
    <div>
        {country && country.length == 1 && (
        <div>
          <h1>{country[0].name.common}</h1>
          <p>capital {country[0].capital[0]}</p>
          <p>area {country[0].area}</p>
          <p><b>languages: </b></p>
          <ul>
            {Object.entries(country[0].languages).map(([i, value]) => (
              <li>{value}</li>
            ))}
          </ul>
          <img src={country[0].flags.png} alt="flag" />
          {weather && 
            <>
              <h2>Weather in {weather.data.name}</h2>
              <p>temperature - {weather.data.main.temp} Celcius</p>
              <img src={`https://openweathermap.org/img/wn/${weather.data.weather[0].icon}@2x.png`} alt="" />
              <p>wind {weather.data.wind.speed} m/s</p>
            </>
          }
        </div>
      )}
    </div>
  )
}

export default Country