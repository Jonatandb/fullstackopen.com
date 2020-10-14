import React from 'react'
import { useState } from 'react'

const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Jonatan Db', number: '123-345-567' }
    ])

    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')

    const handleChangeName = evt => setNewName(evt.target.value)
    const handleChangeNumber = evt => setNewNumber(evt.target.value)

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

    return (
        <div>
            <h2>Phonebook</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    name: <input value={newName} onChange={handleChangeName} />
                </div>
                <div>
                    number: <input value={newNumber} onChange={handleChangeNumber} />
                </div>
                <div>
                    <button type='submit'>add</button></div>
            </form>
            <h2>Numbers</h2>
            {persons.map(p => <div key={p.name}>{p.name} {p.number}</div>)}
        </div>
    )
}

export default App