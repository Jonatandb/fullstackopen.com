import React from 'react'
import Person from './Person'

export default function Persons({ persons }) {
    return persons.map(p => <Person key={p.name} {...p} />)
}
