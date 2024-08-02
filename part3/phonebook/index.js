require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
const Person = require('./models/person')

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
  const numPersons = Person.length
  const time = new Date(Date.now())
  res.send(
    `
      <p>Phonebook has info for ${numPersons} people</p>
      <p>${time}</p>
    `
  )
})

app.get('/api/persons', (req, res) => {
  Person.find({}).then(result => {
    res.json(result)
  })
})

app.get('/api/persons/:id', (req, res) => {
  const id = req.params.id
  Person.findById(id).then(person => {
    res.json(person)
  })

  // if (!person) {
  //   return res.status(404).send('Not found any person with the current id')
  // }
})

app.delete('/api/persons/:id', (req, res) => {
  const id = req.params.id
  Person.findByIdAndDelete(id).then(result => {
    res.status(204).send()
  })
})

app.post('/api/persons', async (req, res) => {
  const body = req.body

  if (!body.name) {
    return res.status(400).send('Body missing')
  }
  if (await nameExist(body.name)) {
    return res.status(400).send('Name must be unique')
  }
  if (!body.number) {
    return res.status(400).send('Number missing')
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  })

  person.save().then(result => {
    res.json(result)
  })
})

const nameExist = async (name) => {
  console.log(name)
  Person.findOne({name: name}).exec().then(res => {
    console.log(res)
    if (res === null) {
      return false
    } else {
      return true
    }
  })
}

app.put('/api/persons/:id', (req, res) => {
  const id = req.params.id
  const body = req.body

  if (!body.name) {
    return res.status(400).send('Name missing')
  }
  if (!body.number) {
    return res.status(400).send('Number missing')
  }

  Person.findByIdAndUpdate(id, {number: body.number})
  .then(result => {
    res.json(result)
  })
})

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

