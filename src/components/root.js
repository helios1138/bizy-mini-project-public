import './root.css'

import React from 'react'
import { connect } from 'react-redux'

import { Autocomplete } from './autocomplete'

let Root = ({ loading }) => (
  <div className="container">
    {
      loading ?
        <h3>Loading...</h3> :
        <div>
          <pre>Press TAB or click on suggestion to confirm, press ENTER to clear input</pre>
          <Autocomplete />
        </div>
    }
  </div>
)

Root = connect(
  state => ({
    loading: state.birds.length === 0
  })
)(Root)

export { Root }
