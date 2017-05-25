export function createThunkMiddleware(extraArgument) {
  return ({ dispatch, getState }) => next => action => {
    if (typeof action.payload === 'function') {
      return action.payload(dispatch, getState, extraArgument)
    }

    return next(action)
  }
}

export const thunkMiddleware = createThunkMiddleware()
