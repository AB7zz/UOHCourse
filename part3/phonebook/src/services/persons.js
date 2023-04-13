import axios from 'axios'

const baseUrl = 'http://localhost:3001'

const create = newPerson => {
    const request = axios.post(`${baseUrl}/api/persons`, newPerson)
    return request.then(response => response.data)
}

const getAll = () => {
    const request = axios.get(`${baseUrl}/all`)
    return request.then(response => response.data)
}

const Delete = id => {
    const request = axios.delete(`${baseUrl}/api/persons/${id}`)
    return request.then(response => response.data)
}

const update = (id, newPerson) => {
    const request = axios.put(`${baseUrl}/api/persons/${id}`, newPerson)
    return request.then(response => response.data)
}

export default {create, getAll, Delete, update}