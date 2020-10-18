import React from 'react'

export default function Person({ id, name, number, handleDelete }) {
    return <div>{name} {number} <button onClick={() => handleDelete(id)}>delete</button></div>
}
