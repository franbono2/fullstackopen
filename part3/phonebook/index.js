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

app.get('/api/persons', (req, res, next) => {
  Person.find({}).then(result => {
    res.json(result)
  })
  .catch(error => next(error))
})

app.get('/api/persons/:id', (req, res, next) => {
  const id = req.params.id
  Person.findById(id)
  .then(person => {
    if (person) {
      res.json(person)
    } else {
      res.status(404).send()
    }
  })
  .catch(error => next(error))

  // if (!person) {
  //   return res.status(404).send('Not found any person with the current id')
  // }
})

app.delete('/api/persons/:id', (req, res, next) => {
  const id = req.params.id
  Person.findByIdAndDelete(id).then(result => {
    res.status(204).send()
  })
  .catch(error => next(error))
})

app.post('/api/persons', async (req, res, next) => {
  const body = req.body

  if (!body.name) {
    return res.status(400).send('Body missing')
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
  .catch(error => next(error))
})

app.put('/api/persons/:id', (req, res, next) => {
  const id = req.params.id
  const body = req.body

  if (!body.name) {
    return res.status(400).send('Name missing')
  }
  if (!body.number) {
    return res.status(400).send('Number missing')
  }

  Person.findByIdAndUpdate(id, {number: body.number}/** {new: true} */) //Traer en result el objeto updateado
  .then(result => {
    res.json(result)
  })
  .catch(error => next(error))
})

const errorHandler = (error, req, res, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' })
  }

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

