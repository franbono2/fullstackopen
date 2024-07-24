import { useEffect, useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/Persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [successMessage, setSuccessMessage] = useState(null)

  useEffect(() => {
    personService.getAll()
    .then(initialPersons => {
      setPersons(initialPersons)
    })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    if (persons.some((person => person.name === newName))){
      if (window.confirm(`${newName} is alredy added to phonebook, replace the old number with a new one?`)){
        const person = persons.find(person => person.name === newName)
        const newPerson = {...person, number: newNumber}
        personService.update(newPerson.id, newPerson)
        .then(newPerson => {
          const newPersons = persons.map(person => {
            if (person.id === newPerson.id){
              return {...person, number: newPerson.number}
            }
            return person
          })
          setPersons(newPersons)
          setNewName('')
          setNewNumber('')
          setSuccessMessage(`Changed ${newPerson.name} number to ${newPerson.number}`)
          setTimeout(() => {
            setSuccessMessage(null)
          }, 5000)
        })
      }
      return
    }
    const newPerson = {
      name: newName,
      number: newNumber
    }
    personService.create(newPerson)
    .then(newPerson => {
      setPersons(persons.concat(newPerson))
      setNewName('')
      setNewNumber('')
      setSuccessMessage(`Added ${newPerson.name}`)
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
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
        setSuccessMessage(`Deleted ${deletedPerson.name}`)
        setTimeout(() => {
          setSuccessMessage(null)
        }, 5000)
      })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={filter} onChange={handleFilterChange} />
      <Notification message={successMessage} />
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