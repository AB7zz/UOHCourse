import express from 'express'
import morgan from 'morgan'
import cors from 'cors'

const app = express()

app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))

app.use(cors())

app.use(express.json())

const PORT = process.env.PORT || 3001

let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/', (request, response) => {
    response.json(persons)
})

app.get('/info', (request, response) => {
    const div = `
    <p>Phone book has info for ${persons.length} people</p>
    <p>${new Date()}</p>
    `
    response.send(div)
})

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    response.send(persons[id])
})

app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id 
    persons = persons.filter(person => person.id != id)
    response.send(persons)
})

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}  

app.post('/api/persons', (request, response) => {
    if(!request.body.name || !request.body.number || persons.find(person => person.name === request.body.name)){
        response.send({ error: "name must be unique"})
        return
    } 
    const newPerson = {
        id: getRandomInt(50),
        name: request.body.name,
        number: request.body.number
    }
    persons = persons.concat(newPerson)
    response.json(persons)
})

app.listen(PORT, () => console.log(`Server running currently in PORT number ${PORT}`))