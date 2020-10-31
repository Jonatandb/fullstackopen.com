const initialState = {
  message: '',
  timeoutId: null
}

const notificationReducer = (state = initialState, action) => {

  switch (action.type) {
    case 'NOTIFICATION': {
      if(state.timeoutId) {
        clearTimeout(state.timeoutId)
      }
      return {
        message: action.message,
        timeoutId: action.timeoutId
      }
    }
    case 'CLEAR_NOTIFICATION': {
      return initialState
    }
    default: {
      return state
    }
  }
}

export const createNotification = (message, seconds) => {
  return dispatch => {
    const timeoutId = setTimeout(() => {
      dispatch({
        type: 'CLEAR_NOTIFICATION'
      })
    }, seconds * 1000);

    dispatch({
      type: 'NOTIFICATION',
      message,
      timeoutId
    })
  }
}

export const clearNotification = message => {
  return {
    type: 'CLEAR_NOTIFICATION'
  }
}

export default notificationReducer