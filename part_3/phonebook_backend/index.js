const express = require('express')
const path = require('path')
const morgan = require('morgan')
const Person = require('./models/person')

const app = express()

morgan.token('body', (request) => {
  return JSON.stringify(request.body)
})

app.use(express.json())
app.use(express.static('dist'))

app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :body')
)



app.get('/api/persons', (request, response) => {
  Person.find({})
    .then(persons => {
      response.json(persons)
    })
})

app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id

  const person = persons.find(person => person.id === id)

  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id

  persons = persons.filter(person => person.id !== id)

  response.status(204).end()
})

app.post('/api/persons', (request, response) => {
  const body = request.body

  // Check if name is missing
  if (!body.name) {
    return response.status(400).json({
      error: 'name is missing'
    })
  }

  // Check if number is missing
  if (!body.number) {
    return response.status(400).json({
      error: 'number is missing'
    })
  }

  // Check for duplicate names
  const nameExists = persons.some(
    person => person.name === body.name
  )

  if (nameExists) {
    return response.status(400).json({
      error: 'name must be unique'
    })
  }

  const person = {
    id: String(Math.floor(Math.random() * 1000000)),
    name: body.name,
    number: body.number
  }

  persons = persons.concat(person)

  response.json(person)
})

app.get('/info', (request, response) => {
  const date = new Date()

  response.send(`
    <p>Phonebook has info for ${persons.length} people</p>
    <p>${date}</p>
  `)
})

const PORT = 3001

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})