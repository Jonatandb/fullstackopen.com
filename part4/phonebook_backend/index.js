require('dotenv').config()
const express = require('express');
const cors = require('cors'); 'cors'
const morgan = require('morgan')
const Person = require('./models/person')

const app = express()

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
app.use(express.static('build'))

let persons = [
    {
        id: 1,
        name: "Arto Hellas",
        number: "040-123456"
    },
    {
        id: 2,
        name: "Ada Lovelace",
        number: "39-44-5325523"
    },
    {
        id: 3,
        name: "Dan Abramov",
        number: "12-43-234345"
    },
    {
        id: 4,
        name: "Mary Poppendick",
        number: "39-23-6423122"
    },
    {
        id: 5,
        name: "Jonatandb",
        number: "34-58-0010"
    }
]

app.get('/', (request, response) => {
    response.send('<h1>Hello from Phonebook backend!</h1>')
})

app.get('/info', (request, response) => {
    const personsCount = persons.length
    const requestDate = new Date()
    const content = `<div>
    <p>Phonebook has info for ${personsCount} people</p>
    <p>${requestDate}</p>
</div>`
    response.send(content)
})

app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons => {
        response.json(persons)
    })
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
    Person.findByIdAndRemove(request.params.id)
        .then(result => {
            response.status(204).end()
        })
        .catch(error => next(error))
})

app.post('/api/persons', (request, response) => {
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
        name,
        number
    })

    person.save().then(savedPerson => {
        response.json(savedPerson)
    })

})

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
