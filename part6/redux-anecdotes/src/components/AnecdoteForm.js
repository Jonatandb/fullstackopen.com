import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { createNotification, clearNotification } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdoteService'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const addAnecdote = async evt => {
        evt.preventDefault()
        const anecdote = evt.target.anecdoteInput.value.trim()
        if (anecdote) {
            evt.target.anecdoteInput.value = ''
            const newAnecdote = await anecdoteService.createNew({ content: anecdote })
            dispatch(createAnecdote(newAnecdote))
            dispatch(createNotification(`You created: '${newAnecdote.content}'.`))
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