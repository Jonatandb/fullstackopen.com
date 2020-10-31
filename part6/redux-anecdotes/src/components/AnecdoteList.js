import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { createNotification, clearNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
    const anecdotes = useSelector(state => state.anecdotes)
    const filter = useSelector(state => state.filter)
    const filteredAnecdotes = anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter.trim().toLowerCase()))

    const dispatch = useDispatch()

    const vote = anecdote => {
        dispatch(voteAnecdote(anecdote))
        dispatch(createNotification(`You voted: '${anecdote.content}'.`))
        setTimeout(() => {
            dispatch(clearNotification())
        }, 5000);
    }

    return filteredAnecdotes.sort((a, b) => a.votes > b.votes ? -1 : 1).map(anecdote =>
        <div key={anecdote.id}>
            <div>
                {anecdote.content}
            </div>
            <div>
                has {anecdote.votes}
                &nbsp;<button onClick={() => vote(anecdote)}>Vote</button>
            </div>
        </div>
    )
}

export default AnecdoteList