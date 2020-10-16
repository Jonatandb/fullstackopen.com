import React, { useState, useEffect } from 'react'
import PersonForm from './PersonForm'
import Persons from './Persons'
import Filter from './Filter'
import personsService from './services/personsService'

const Phonebook = () => {
    const [persons, setPersons] = useState([])

    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filterText, setFilterText] = useState('')

    const handleChangeName = evt => setNewName(evt.target.value)
    const handleChangeNumber = evt => setNewNumber(evt.target.value)
    const handleChangeFilter = evt => setFilterText(evt.target.value)

    const handleSubmit = evt => {
        evt.preventDefault()
        if (persons.map(p => p.name).includes(newName)) {
            alert(`${newName} is already added to phonebook`)
        } else {
            const newPerson = { name: newName, number: newNumber }
            personsService
                .create(newPerson)
                .then(data => {
                    setPersons(persons.concat(data))
                    setNewName('')
                    setNewNumber('')
                })
                .catch(e => {
                    alert(`No se pudo conectar con el servicio de personas: ${e}`)
                })
        }
    }

    useEffect(() => {
        personsService
            .getAll()
            .then(initialData => {
                setPersons(initialData)
            })
            .catch(e => {
                alert(`No se pudo conectar con el servicio de personas: ${e}`)
            })
    }, [])

    let filteredPersons = persons

    if (filterText.trim().length > 0) {
        filteredPersons = persons.filter(p => p.name.toLowerCase().includes(filterText.toLowerCase()))
    }

    return (
        <div>
            <h2>Phonebook</h2>

            <Filter handleChangeFilter={handleChangeFilter} />

            <h3>Add a new</h3>

            <PersonForm handleSubmit={handleSubmit} handleChangeName={handleChangeName} handleChangeNumber={handleChangeNumber} newName={newName} newNumber={newNumber} />

            <h3>Numbers</h3>

            <Persons persons={filteredPersons} />
        </div>
    )
}

export default Phonebook