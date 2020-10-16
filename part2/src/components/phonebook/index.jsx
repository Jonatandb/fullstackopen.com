import React, { useState, useEffect } from 'react'
import PersonForm from './PersonForm'
import Persons from './Persons'
import Filter from './Filter'
import NotificationMessage from './NotificationMessage'

import personsService from './services/personsService'

const Phonebook = () => {
    const [persons, setPersons] = useState([])
    const [notification, setNotification] = useState(null)
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filterText, setFilterText] = useState('')

    const handleChangeName = evt => setNewName(evt.target.value)
    const handleChangeNumber = evt => setNewNumber(evt.target.value)
    const handleChangeFilter = evt => setFilterText(evt.target.value)

    const handleSubmit = evt => {
        evt.preventDefault()

        if (newName.trim().length === 0) return

        const person = persons.find(p => p.name === newName)

        if (person) {
            const result = window.confirm(`${person.name} is already added to phonebook, replace the old number with a new one?`)
            if (result) {
                updatePerson(person)
            }
        } else {
            addNewPerson()
        }
    }

    const handleDelete = id => {
        const person = persons.find(p => p.id === id)
        const result = window.confirm(`Delete ${person.name}?`)
        if (result) {
            personsService
                .remove(id)
                .then(response => {
                    getData()
                })
                .catch(e => {
                    alert(`Error deleting: ${e} `)
                })
        }
    }

    const getData = () => {
        personsService
            .getAll()
            .then(initialData => {
                setPersons(initialData)
            })
            .catch(e => {
                alert(`Error connecting to service: ${e} `)
            })
    }

    const addNewPerson = () => {
        const newPerson = { name: newName, number: newNumber }
        personsService
            .create(newPerson)
            .then(returnedPerson => {
                setPersons(persons.concat(returnedPerson))
                setNewName('')
                setNewNumber('')
                setNotification(`Added ${returnedPerson.name}`)
                setTimeout(() => {
                    setNotification(null)
                }, 2000);
            })
            .catch(e => {
                alert(`Error adding: ${e}`)
            })
    }

    const updatePerson = person => {
        const updatedPerson = {
            ...person,
            number: newNumber
        }
        personsService
            .update(updatedPerson)
            .then(response => {
                setPersons(persons.map(p => p.id !== updatedPerson.id ? p : updatedPerson))
                setNewName('')
                setNewNumber('')
                setNotification(`Updated ${updatedPerson.name}`)
                setTimeout(() => {
                    setNotification(null)
                }, 2000);
            })
            .catch(e => {
                alert(`Error updating: ${e}`)
            })
    }

    useEffect(() => {
        getData()
    }, [])

    let filteredPersons = persons

    if (filterText.trim().length > 0) {
        filteredPersons = persons.filter(p => p.name.toLowerCase().includes(filterText.toLowerCase()))
    }

    return (
        <div>
            <h2>Phonebook</h2>

            <NotificationMessage message={notification} />

            <Filter handleChangeFilter={handleChangeFilter} />

            <h3>Add a new</h3>

            <PersonForm handleSubmit={handleSubmit} handleChangeName={handleChangeName} handleChangeNumber={handleChangeNumber} newName={newName} newNumber={newNumber} />

            <h3>Numbers</h3>

            <Persons persons={filteredPersons} handleDelete={handleDelete} />
        </div>
    )
}

export default Phonebook