import { combineReducers } from 'redux'

import { birds } from './birds'
import { input } from './input'

export const root = combineReducers({
  birds,
  input
})
