import anecdoteService from "../services/anecdoteService"
import { createNotification } from "./notificationReducer"

const anoecdoteReducer = (state = [], action) => {

  switch (action.type) {
    case 'VOTE': {
      const result = [
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
    try {
      const votedAnecdote = await anecdoteService.increaseVote(anecdote)
      dispatch({
        type: 'VOTE',
        anecdote: votedAnecdote
      })
      dispatch(createNotification(`You voted: '${anecdote.content}'.`, 5))
    } catch (e) {
      dispatch(createNotification(e.message, 10))
    }
  }
}

export const createAnecdote = anecdote => {
  return async dispatch => {
    try {
      const newAnecdote = await anecdoteService.createNew(anecdote)
      dispatch({
        type: 'CREATE',
        anecdote: newAnecdote
      })
      dispatch(createNotification(`You created: '${anecdote}'.`, 5))
    } catch (e) {
      dispatch(createNotification(e.message, 10))
    }
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    try {
      const anecdotes = await anecdoteService.getAll()
      dispatch({
        type: 'INITIALIZE_ANECDOTES',
        anecdotes
      })
    } catch (e) {
      dispatch(createNotification(e.message, 10))
    }
  }
}

export default anoecdoteReducer