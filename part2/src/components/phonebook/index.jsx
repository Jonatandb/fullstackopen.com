import React, { useState, useEffect } from 'react'
import axios from 'axios'
import PersonForm from './PersonForm'
import Persons from './Persons'
import Filter from './Filter'

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
            setPersons([...persons, { name: newName, number: newNumber }])
            setNewName('')
            setNewNumber('')
        }
    }

    useEffect(() => {
        axios
            .get('http://localhost:3001/persons')
            .then(response => {
                const data = response.data
                setPersons(data)
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