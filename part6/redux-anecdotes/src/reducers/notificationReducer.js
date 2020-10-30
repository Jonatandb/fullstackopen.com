
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

export const createNotification = message => {
  return {
    type: 'NOTIFICATION',
    message
  }
}

export const clearNotification = message => {
  return {
    type: 'CLEAR_NOTIFICATION'
  }
}

export default notificationReducer