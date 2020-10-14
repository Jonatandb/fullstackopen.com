import React, { useState } from 'react'
import PersonForm from './phonebook/PersonForm'
import Persons from './phonebook/Persons'
import Filter from './phonebook/Filter'

const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Jonatan Db', number: '123-345-567' },
        { name: 'Ada Lovelace', number: '39-44-5323523' },
        { name: 'Arto Hellas', number: '040-1234567' }
    ])

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
            setPersons([...persons, { name: newName, number: newNumber }])
            setNewName('')
            setNewNumber('')
        }
    }

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

export default App