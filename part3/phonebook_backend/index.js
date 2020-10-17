const express = require('express');
const app = express()

app.use(express.json())

let persons = [
    {
        id: 1,
        name: "Arto Hellas",
        numer: "040-123456"
    },
    {
        id: 2,
        name: "Ada Lovelace",
        numer: "39-44-5325523"
    },
    {
        id: 3,
        name: "Dan Abramov",
        numer: "12-43-234345"
    },
    {
        id: 4,
        name: "Mary Poppendick",
        numer: "39-23-6423122"
    },
    {
        id: 5,
        name: "Jonatandb",
        numer: "34-58-0010"
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
    response.json(persons)
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
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
    response.status(204).end()
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
