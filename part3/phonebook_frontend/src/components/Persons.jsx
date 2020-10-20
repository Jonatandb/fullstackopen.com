import React from 'react'
import Person from './Person'

export default function Persons({ persons, handleDelete }) {
    return persons.map(p => <Person key={p.name} {...p} handleDelete={handleDelete} />)
}
