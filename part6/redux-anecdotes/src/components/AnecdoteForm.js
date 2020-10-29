import React from 'react'
import { useDispatch } from 'react-redux'
import { asObject, createAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const addNote = evt => {
        evt.preventDefault()
        const newNote = asObject(evt.target.noteInput.value)
        evt.target.noteInput.value = ''
        dispatch(createAnecdote(newNote))
    }

    return (
        <div>
            <h2>Create new</h2>
            <form onSubmit={addNote}>
                <div><input id='noteInput' type='text' /></div>
                <button>Create</button>
            </form>
        </div>
    )
}

export default AnecdoteForm