import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import Person from './mongo.js'

const app = express()

app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))

app.use(cors())

app.use(express.json())

const PORT = process.env.PORT || 3001

let persons



app.get('/info', async(request, response) => {
  persons = await Person.find({})
  const div = `
  <p>Phone book has info for ${persons.length} people</p>
  <p>${new Date()}</p>
  `
  response.send(div)
})

app.get('/', async(request, response) => {
  persons = await Person.find({})
  console.log(persons)
  response.json(persons)
})

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then(person => {
      if (person) {
        response.send(person)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
    const id = request.params.id

    Person.deleteOne({_id: id})
      .then(() => {
        response.status(204).end()
      })
      .catch(error => next(error))
})

app.post('/api/persons', async(request, response) => {
  console.log(request.body)

  const newPerson = new Person({
      name: request.body.name,
      number: request.body.number
  })

  newPerson.save()
    .then(result => {
      console.log(result)
      response.send(result)
    })
})

app.put('/api/persons/:id', (request, response, next) => {
  const id = request.params.id

  const newPerson = {
    name: request.body.name,
    number: request.body.number
  }

  Person.findByIdAndUpdate(id, newPerson, {new:true})
    .then(result => {
      response.send(result)
    })
    .catch(error => next(error))
})

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

app.use(errorHandler)

app.listen(PORT, () => console.log(`Server running currently in PORT number ${PORT}`))