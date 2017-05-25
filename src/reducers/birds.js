import { handleActions } from 'redux-actions'

import { app } from '../actions/app'

export const birds = handleActions({
  [app.birds.load]: (state, action) => action.payload
}, [])
