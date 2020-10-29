const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  console.log(action)
  switch (action.type) {
    case 'GOOD':
    case 'OK':
    case 'BAD':
      const property = action.type.toLowerCase()
      return {
        ...state,
        [property]: state[property] + 1
      }
    case 'ZERO':
      return initialState
    default: return state
  }

}

export default counterReducer