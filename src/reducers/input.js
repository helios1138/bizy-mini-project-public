import { handleActions } from 'redux-actions'

import { app } from '../actions/app'

export const input = handleActions({
  [app.input.set]: (state, action) => ({ value: action.payload })
}, { value: '' })
