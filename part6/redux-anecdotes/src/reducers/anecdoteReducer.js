import anecdoteService from "../services/anecdoteService"

const anoecdoteReducer = (state = [], action) => {

  switch (action.type) {
    case 'VOTE': {
      const result =  [
        ...state.map(anecdote => anecdote.id === action.anecdote.id ? action.anecdote : anecdote)
      ]
      return result
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

export const voteAnecdote = anecdote => {
  return async dispatch => {
      const votedAnecdote = await anecdoteService.increaseVote(anecdote)
      dispatch({
        type: 'VOTE',
        anecdote: votedAnecdote
      })
  }
}

export const createAnecdote = anecdote => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(anecdote)
    dispatch({
      type: 'CREATE',
      anecdote: newAnecdote
    })
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