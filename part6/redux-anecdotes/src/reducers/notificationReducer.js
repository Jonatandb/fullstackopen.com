
const notificationReducer = (state = '', action) => {

  switch (action.type) {
    case 'NOTIFICATION': {
      return action.message
    }
    case 'CLEAR_NOTIFICATION': {
      return ''
    }
    default: {
      return state
    }
  }
}

export const createNotification = (message, seconds) => {
  return dispatch => {
    dispatch({
      type: 'NOTIFICATION',
      message
    })
    setTimeout(() => {
      dispatch({
        type: 'CLEAR_NOTIFICATION'
      })
    }, seconds * 1000);
  }
}

export const clearNotification = message => {
  return {
    type: 'CLEAR_NOTIFICATION'
  }
}

export default notificationReducer