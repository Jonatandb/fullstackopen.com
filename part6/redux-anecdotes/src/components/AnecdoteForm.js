import React from 'react'
import { useDispatch } from 'react-redux'
import { asObject, createAnecdote } from '../reducers/anecdoteReducer'
import { createNotification, clearNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const addNote = evt => {
        evt.preventDefault()
        const note = evt.target.noteInput.value.trim()
        if (note) {
            const newNote = asObject(note)
            dispatch(createAnecdote(newNote))
            dispatch(createNotification(`You created: '${note}'.`))
            setTimeout(() => {
                dispatch(clearNotification())
            }, 5000);
        }
        evt.target.noteInput.value = ''
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