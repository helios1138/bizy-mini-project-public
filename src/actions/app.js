import { createActions } from '../func/create-actions'

export const app = createActions({
  init: () => dispatch => dispatch(app.birds.load('birds.json')),

  birds: {
    load: url => fetch(url).then(response => response.json())
  },

  input: {
    set: value => value
  }
})
