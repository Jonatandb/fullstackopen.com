import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { createNotification, clearNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const addAnecdote = async evt => {
        evt.preventDefault()
        const anecdote = evt.target.anecdoteInput.value.trim()
        if (anecdote) {
            evt.target.anecdoteInput.value = ''
            dispatch(createAnecdote(anecdote))
            dispatch(createNotification(`You created: '${anecdote}'.`))
            setTimeout(() => {
                dispatch(clearNotification())
            }, 5000);
        }
    }

    return (
        <div>
            <h2>Create new</h2>
            <form onSubmit={addAnecdote}>
                <div><input id='anecdoteInput' type='text' /></div>
                <button>Create</button>
            </form>
        </div>
    )
}

export default AnecdoteForm