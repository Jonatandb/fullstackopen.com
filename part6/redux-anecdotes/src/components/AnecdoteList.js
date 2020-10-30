import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
    const anecdotes = useSelector(state => state.anecdotes)
    const dispatch = useDispatch()

    const vote = (id) => {
        console.log('vote', id)
        dispatch(voteAnecdote(id))
    }

    return anecdotes.sort((a, b) => a.votes > b.votes ? -1 : 1).map(anecdote =>
        <div key={anecdote.id}>
            <div>
                {anecdote.content}
            </div>
            <div>
                has {anecdote.votes}
                &nbsp;<button onClick={() => vote(anecdote.id)}>Vote</button>
            </div>
        </div>
    )
}

export default AnecdoteList