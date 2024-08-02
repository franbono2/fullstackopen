const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()

morgan.token('person', function (req, res) { return JSON.stringify(res.req.body)})

app.use(express.static('dist'))
app.use(express.json())
app.use(cors())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :person'))

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

app.get('/', (req, res) => {
  res.send('<h1>Hello World</h1>')
})

app.get('/info', (req, res) => {
  const numPersons = persons.length
  const time = new Date(Date.now())
  res.send(
    `
      <p>Phonebook has info for ${numPersons} people</p>
      <p>${time}</p>
    `
  )
})

app.get('/api/persons', (req, res) => {
  res.json(persons)
})

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  const person = persons.find(person => person.id === id)

  if (!person) {
    return res.status(404).send('Not found any person with the current id')
  }

  res.json(person)
})

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  persons = persons.filter(person => person.id !== id)

  res.status(204).send()
})

app.post('/api/persons', (req, res) => {
  const body = req.body

  if (!body.name) {
    return res.status(400).send('Body missing')
  }
  if (nameExist(body.name)) {
    return res.status(400).send('Name must be unique')
  }
  if (!body.number) {
    return res.status(400).send('Number missing')
  }

  const person = {
    id: generateId(),
    name: body.name,
    number: body.number
  }

  persons = persons.concat(person)
  res.json(person)
})

const nameExist = (name) => {
  return persons.some(person => person.name === name)
}

const generateId = () => {
  const maxId = persons.length > 0 ? Math.max(...persons.map(person => person.id)) : 0
  return maxId + 1
}

app.put('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  const body = req.body

  if (!body.name) {
    return res.status(400).send('Body missing')
  }
  if (!body.number) {
    return res.status(400).send('Number missing')
  }

  persons = persons.map(person => {
    if (person.id === id){
      return {...person, number: body.number}
    }
    return person
  })
  
  const person = persons.find(person => person.id === id)
  res.json(person)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

