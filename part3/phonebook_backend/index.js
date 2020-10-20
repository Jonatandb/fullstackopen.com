require('dotenv').config()
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const Person = require('./models/person')

const app = express()

const errorHandler = (error, request, response, next) => {
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }
  if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }
  next(error)
}

app.use(express.static('build'))
app.use(express.json())
app.use(cors())
app.use(morgan(function (tokens, req, res) {
  let result = [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms',
  ]
  if (tokens.method(req, res) === 'POST') {
    result.push(JSON.stringify(req.body))
  }
  result = result.join(' ')
  return result
}))

app.get('/', (request, response) => {
  response.send('<h1>Hello from Phonebook backend!</h1>')
})

app.get('/info', (request, response, next) => {
  Person.find({})
    .then(persons => {
      const personsCount = persons.length
      const requestDate = new Date()
      const content = `<div>
            <p>Phonebook has info for ${personsCount} people</p>
            <p>${requestDate}</p>
            </div>`
      response.send(content)
    })
    .catch(error => next(error))

})

app.get('/api/persons', (request, response, next) => {
  Person.find({})
    .then(persons => response.json(persons))
    .catch(error => next(error))
})

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then(person => {
      if (person) {
        return response.json(person)
      }
      return response.status(404).end()
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

app.post('/api/persons', (request, response, next) => {
  //console.log('get headers:', request.headers) // Always should exists: 'content-type': 'application/json'

  const { name, number } = request.body

  if (!name || name.trim().length === 0) {
    return response.status(404).json({
      error: 'name missing'
    })
  }

  if (!number || number.trim().length === 0) {
    return response.status(404).json({
      error: 'number missing'
    })
  }

  const person = new Person({
    name: name.trim(),
    number: number.trim()
  })

  person.save()
    .then(savedPerson => {
      response.json(savedPerson.toJSON())
    })
    .catch(error => next(error))

})

app.put('/api/persons/:id', (request, response, next) => {

  const { name, number } = request.body
  const { id } = request.params

  const person = {
    name: name.trim(),
    number: number.trim()
  }

  Person.findByIdAndUpdate(id, person, { runValidators: true, context: 'query' })
    .then(updatedPerson => {
      response.json(updatedPerson)
    })
    .catch(error => next(error))
})

app.use(errorHandler)

// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
