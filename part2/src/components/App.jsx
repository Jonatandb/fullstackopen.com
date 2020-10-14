import React from 'react'
import { useState } from 'react'

const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Jonatan Db' }
    ])

    const [newName, setNewName] = useState('')

    const handleChange = evt => setNewName(evt.target.value)

    const handleSubmit = evt => {
        evt.preventDefault()
        setPersons(persons.concat({ name: newName }))
        setNewName('')
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    name: <input value={newName} onChange={handleChange} />
                </div>
                <div>
                    <button type='submit'>add</button></div>
            </form>
            <h2>Numbers</h2>
            {persons.map(p => <div key={p.name}>{p.name}</div>)}
        </div>
    )
}

export default App