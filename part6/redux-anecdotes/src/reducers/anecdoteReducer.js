import anecdoteService from "../services/anecdoteService"

const anoecdoteReducer = (state = [], action) => {

  switch (action.type) {
    case 'VOTE': {
      const upvotedAnecdote = { ...state.find(a => a.id === action.id) }
      upvotedAnecdote.votes++
      return [
        ...state.map(anecdote => anecdote.id === action.id ? upvotedAnecdote : anecdote)
      ]
    }
    case 'CREATE': {
      return [
        ...state,
        action.anecdote
      ]
    }
    case 'INITIALIZE_ANECDOTES': {
      return action.anecdotes
    }
    default: {
      return state
    }
  }
}

export const voteAnecdote = id => {
  return {
    type: 'VOTE',
    id
  }
}

export const createAnecdote = anecdote => {
  return {
    type: 'CREATE',
    anecdote
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INITIALIZE_ANECDOTES',
      anecdotes
    })
  }
}

export default anoecdoteReducer