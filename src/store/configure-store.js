import { applyMiddleware, createStore } from 'redux'
import { createLogger } from 'redux-logger'
import promiseMiddleware from 'redux-promise'

import { thunkMiddleware } from '../middleware/thunk-middleware'
import { root } from '../reducers/root'

const middleware = [
  thunkMiddleware,
  promiseMiddleware
]

if (process.env.NODE_ENV === 'development') {
  middleware.push(createLogger({
    collapsed: true,
    diff: true,
    duration: true
  }))
}

export const configureStore = () => createStore(
  root,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(...middleware)
)
