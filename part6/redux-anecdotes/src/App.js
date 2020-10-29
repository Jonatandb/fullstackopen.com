import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { asObject, createAnecdote, voteAnecdote } from './reducers/anecdoteReducer'

const App = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()

  const vote = (id) => {
    console.log('vote', id)
    dispatch(voteAnecdote(id))
  }

  const addNote = evt => {
    evt.preventDefault()
    const newNote = asObject(evt.target.noteInput.value)
    evt.target.noteInput.value = ''
    dispatch(createAnecdote(newNote))
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
      <h2>Create new</h2>
      <form onSubmit={addNote}>
          <div><input id='noteInput' type='text' /></div>
          <button>Create</button>
      </form>
    </div>
  )
}

export default App