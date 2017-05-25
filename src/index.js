import 'whatwg-fetch'

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import { Root } from './components/root'
import { configureStore } from './store/configure-store'
import { app } from './actions/app'

const store = configureStore()

store.dispatch(app.init())

ReactDOM.render(
  <Provider store={store}>
    <Root />
  </Provider>,
  document.getElementById('root')
)
