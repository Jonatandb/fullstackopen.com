
  const notificationReducer = (state = '', action) => {
    console.log('state now: ', state)
    console.log('action', action)

    switch (action.type) {
      case 'NOTIFICATION': {
        return action.message
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

  export default notificationReducer