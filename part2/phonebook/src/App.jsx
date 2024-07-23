import { useEffect, useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/Persons'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    personService.getAll()
    .then(initialPersons => {
      setPersons(initialPersons)
    })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    if (persons.some((person => person.name === newName))){
      alert(`${newName} is already added to phonebook`)
      return
    }
    const newPerson = {
      name: newName,
      number: newNumber,
      id: `${persons.length + 1}`
    }
    personService.create(newPerson)
    .then(newPerson => {
      setPersons(persons.concat(newPerson))
      setNewName('')
      setNewNumber('')
    })
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const personsToShow = persons.filter(person => {
    const nameLowerCase = person.name.toLocaleLowerCase()
    const filterLowerCase = filter.toLocaleLowerCase()
    return nameLowerCase.includes(filterLowerCase) 
  })

  const handleDeleteButton = id => {
    if (window.confirm(`Do you really want to delete?`)){
      personService.deletePerson(id)
      .then(deletedPerson => {
        const personsCopy = persons.filter(person => {
          return person.id !== deletedPerson.id
        })
        setPersons(personsCopy)
      })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={filter} onChange={handleFilterChange} />
      <h3>Add a new</h3>
      <PersonForm
        onSubmit={addPerson}
        nameValue={newName}
        onNameChange={handleNameChange}
        numberValue={newNumber}
        onNumberChange={handleNumberChange}
      />
      <h3>Numbers</h3>
      <Persons personsToShow={personsToShow} onClick={handleDeleteButton} />
    </div>
  )
}

export default App