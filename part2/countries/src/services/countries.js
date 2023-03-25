import axios from 'axios'

const baseUrl = 'https://restcountries.com/v3.1'

const getAll = () => {
    const request = axios.get(`${baseUrl}/all`)
    return request.then(response => response.data)
}

const getCountry = country => {
    const request = axios.get(`${baseUrl}/name/${country}`)
    return request.then(response => response.data)
}

export default {getAll, getCountry}